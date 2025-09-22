"use client";

import PageBreadcrumb from "@/src/components/admin/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

type Message = {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  description: string;
  createdAt: string;
};

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/contact-messages")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setMessages(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { name: "Name", selector: (row: Message) => row.name, sortable: true },
    { name: "Phone", selector: (row: Message) => row.phone },
    { name: "Email", selector: (row: Message) => row.email },
    { name: "Subject", selector: (row: Message) => row.subject },
    { name: "Message", selector: (row: Message) => row.description },
    {
      name: "Date",
      selector: (row: Message) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Support Requests" />
      <DataTable
        columns={columns}
        data={messages}
        progressPending={loading}
        pagination
        paginationPerPage={10}
        highlightOnHover
        responsive
        noDataComponent="There are no support requests yet."
      />
    </div>
  );
}
