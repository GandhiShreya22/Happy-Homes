"use client";
import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Script from "next/script";
import AOSInit from "@/src/components/AOSInit";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    // For admin routes, don't include header/footer and main site CSS
    return <>{children}</>;
  }

  // For main site routes, include header/footer and all CSS
  return (
    <>
      <Script src="/assets/js/theme-script.js" type="8716cb7b0dd66a08ffb29cd6-text/javascript" />
      <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/plugins/material-icon/material-icon.css" />
      <link rel="stylesheet" href="/assets/plugins/fontawesome/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/assets/plugins/fontawesome/css/all.min.css" />
      <link rel="stylesheet" href="/assets/plugins/select2/css/select2.min.css" />
      <link rel="stylesheet" href="/assets/css/aos.css" />
      <link rel="stylesheet" href="/assets/plugins/slick/slick.css" />
      <link rel="stylesheet" href="/assets/plugins/slick/slick-theme.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
      <AOSInit />
      <div className="client-wrapper">
        <Header />
        {children}
        <Footer />
      </div>
      <Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
      <Script src="/assets/plugins/select2/js/select2.min.js" strategy="lazyOnload" />
      <Script src="/assets/plugins/slick/slick.js" strategy="lazyOnload" />
      <Script src="/assets/js/waypoints.js" strategy="lazyOnload" />
      <Script src="/assets/js/jquery.counterup.min.js" strategy="lazyOnload" />
      <Script src="/assets/js/aos.js" strategy="lazyOnload" />
      <Script src="/assets/js/script.js" strategy="lazyOnload" />
    </>
  );
}
