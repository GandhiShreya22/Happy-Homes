import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Allow Next.js Image Optimization for your Hostinger domain uploads
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.happyhomes.co.in", // your actual domain
        pathname: "/uploads/**",           // allow images under /uploads/
      },
    ],
  },
  // Fallback for regular webpack (if not using turbopack)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
