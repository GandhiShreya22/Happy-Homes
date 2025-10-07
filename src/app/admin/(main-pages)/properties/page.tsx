"use client";

import { PencilIcon } from "@/src/assets/icons";
import PageBreadcrumb from "@/src/components/admin/common/PageBreadCrumb";
import Button from "@/src/components/button/Button";
import { defaultErrMsg } from "@/src/utils/constants";
import { formatAmountToInrCurrency, formatDateToGB } from "@/src/utils/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";

type Property = {
  id: number;
  title: string;
  status: string;
  purpose: string;
  price: number;
  created_at: string;
  updated_at: string,
  type: string;
  property_category: { id: number; name: string }
  admin: { id: number; email: string };
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [mounted, setMounted] = useState(false);
  console.log("properties::", properties)

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

  const columns: TableColumn<Property>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <div>{row.title}</div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.type,
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
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <Link
            href={`/admin/properties/add?id=${row.id}`}
            className="text-indigo-600 hover:underline"
          >
            Edit
          </Link>
          <Button variant="outline" className="px-3 py-2" size="sm"
          // startIcon={<PencilIcon />}
          >
            <PencilIcon />
          </Button>
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  if (!mounted) return null; // Hydration-safe

  return (
    <div>
      <PageBreadcrumb pageTitle="Properties List" />
      <div className="bg-white shadow rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4">
        <DataTable
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
        />
      </div>
    </div>
  );
}
