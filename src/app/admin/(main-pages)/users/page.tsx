"use client";

import PageBreadcrumb from "@/src/components/admin/common/PageBreadCrumb";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  submitted_at: string;
  property: {
    id: number;
    title: string;
    slug: string;
  };
}

export default function UserListing() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    fetchLeads();
  }, [page, perPage]);

  const fetchLeads = async (pageNumber = page, rowsPerPage = perPage) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?page=${pageNumber}&limit=${rowsPerPage}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.data.leads);          // array of leads from API
        setTotalRows(data.data.total);      // total count for pagination
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Lead) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row: Lead) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Lead) => row.email,
    },
    {
      name: "Phone",
      selector: (row: Lead) => row.phone,
    },
    {
      name: "Property",
      selector: (row: Lead) => row.property.title,
      sortable: true,
    },
    {
      name: "Submitted At",
      selector: (row: Lead) => new Date(row.submitted_at).toLocaleString(),
      sortable: true,
    },
    {
      name: "Message",
      selector: (row: Lead) => row.message || "-",
      wrap: true,
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Users List" />
      <div className="bg-white shadow rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4">
        <DataTable
          columns={columns}
          data={leads}
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
          noDataComponent="No users yet"
        />
      </div>
    </div>
  );
}
