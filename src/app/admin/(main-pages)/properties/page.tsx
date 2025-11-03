"use client";

import PageBreadcrumb from "@/src/components/admin/common/PageBreadCrumb";
import Button from "@/src/components/button/Button";
import { defaultErrMsg } from "@/src/utils/constants";
import { formatAmountToInrCurrency, formatDateToGB } from "@/src/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";

type Property = {
  id: number;
  title: string;
  status: string;
  purpose: string;
  price: number;
  created_at: string | null;
  updated_at: string | null;
  type: string;
  property_category: { id: number; name: string } | null;
  admin: { id: number; email: string } | null;
  images: { id: number; image_url: string }[];
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    properties: Property[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export default function PropertyListing() {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [mounted, setMounted] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null); // for per-row toggle spinner

  // Ensure client-only code to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProperties = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties?page=${page}&limit=${limit}`);
      const data: ApiResponse = await res.json();

      if (data.success) {
        const resData = data?.data;
        console.log("resData::", resData)
        setProperties(resData.properties);
        setTotalRows(resData.pagination.total);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error(defaultErrMsg)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(page, perPage);
  }, [page, perPage]);

  const handleToggleStatus = async (property: Property) => {
    const newStatus = property.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    // optional confirmation
    // if (!confirm(`Are you sure you want to ${newStatus === "ACTIVE" ? "activate" : "deactivate"} this property?`)) {
    //   return;
    // }

    try {
      setTogglingId(property.id);
      const res = await fetch(`/api/admin/property/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: property.id,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        toast.error(data?.message || `Failed to update status`);
        return;
      }

      toast.success(
        `Property ${newStatus === "ACTIVE" ? "activated" : "deactivated"} successfully!`
      );

      // Always refetch fresh data from backend after API success
      fetchProperties(page, perPage);
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error(defaultErrMsg);
    } finally {
      setTogglingId(null);
    }
  };

  const columns: TableColumn<Property>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <div>{row.title}</div>
      ),
      minWidth: "230px"
    },
    {
      name: "Type",
      selector: (row) => row.type,
      cell: (row) => row.type?.toUpperCase(),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.property_category?.name || "",
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => (
        <span suppressHydrationWarning>
          {formatAmountToInrCurrency(row.price)}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded ${row.status === "ACTIVE"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => (
        <span suppressHydrationWarning>
          {row.created_at ? formatDateToGB(row.created_at) : ""}
        </span>
      ),
    },
    {
      name: "Updated At",
      selector: (row) => row.updated_at,
      sortable: true,
      cell: (row) => (
        <span suppressHydrationWarning>
          {row.updated_at ? formatDateToGB(row.updated_at) : ""}
        </span>
      ),
    },
    {
      name: "Toggle Status",
      cell: (row) => (
        <div
          className="relative flex items-center justify-center"
          style={{ minWidth: 70 }}
        >
          {togglingId === row.id ? (
            <div className="animate-spin">
              {/* <CircleWhite className="w-4 h-4 animate-spin stroke-current" strokeColor="#4B5563" /> */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="loading">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2.5" fill="none" />
                <path d="M22 12a10 10 0 0 1-10 10"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none" />
              </svg>
            </div>
          ) : (
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={row.status === "ACTIVE"}
                onChange={() => handleToggleStatus(row)}
                disabled={togglingId === row.id}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
              <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
          )}
        </div>
      ),
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Link
            href={`/property-details/${row.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View
          </Link>
          <Link
            href={`/admin/properties/add?id=${row.id}`}
            className="text-warning-600 hover:underline"
          >
            Edit
          </Link>
          {/* <Button variant="outline" className="" size="sm"
          onClick={() => router.push(`/admin/properties/add?id=${row.id}`)}
          >
            <PencilIcon />
          </Button> */}
          {/* <button className="text-red-600 hover:underline">Delete</button> */}
        </div>
      ),
    },
  ];

  if (!mounted) return null; // Hydration-safe

  return (
    <div>
      <PageBreadcrumb pageTitle="Properties List" />
      <div className="bg-white shadow rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4">
        <div className="text-end mb-3">
          <Button size="sm" onClick={() => router.push("/admin/properties/add")}>Add Property</Button>
        </div>

        <DataTable
          className="custom-datatable"
          columns={columns}
          data={properties || []}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={page}
          paginationPerPage={perPage}
          onChangePage={(page) => setPage(page)}
          onChangeRowsPerPage={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
          highlightOnHover
          striped
          responsive
          fixedHeader
          theme="solarized"
        />
      </div>
    </div>
  );
}
