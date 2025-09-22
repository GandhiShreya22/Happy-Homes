import AdminLayout from "@/src/components/admin/AdminLayout";
// import { SidebarProvider } from "@/src/context/SidebarContext";
import "../admin.css";

export default function MainAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>{children}</AdminLayout>
  );
}
