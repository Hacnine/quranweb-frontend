import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NETLIFY ? ".netlify/output" : ".next",
  turbopack: {
    root: path.resolve(__dirname),
  },
  // API rewrites – proxy /api/* to the Hono backend during development
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
