import type { Metadata } from "next";
import AdminLayout from "@/src/components/admin/AdminLayout";
import { SidebarProvider } from "@/src/context/SidebarContext";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Panel | Happy Homes",
  description: "Admin dashboard for Happy Homes property management",
};

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">
        <SidebarProvider>
          {/* <AdminLayout>{children}</AdminLayout> */}
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Admin Panel | Happy Homes",
//   description: "Admin dashboard for Happy Homes property management",
// };

// export default function AdminRootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return children;
// }
