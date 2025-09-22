import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/src/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Happy Homes",
  description:
    "Happy Homes is a powerful real estate template for property listings, rentals, and agency dashboards.",
  keywords: "real estate template, property management, real estate dashboard, property listings, rental template, agency admin, HTML real estate, React real estate, Vue dashboard, Angular real estate, Laravel property UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/img/apple-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontSize: "14px" },
            success: { style: { background: "#4ade80", color: "white" } }, // green
            error: { style: { background: "#ef4444", color: "white" } },   // red
          }}
        />
      </body>
    </html>
  );
}
