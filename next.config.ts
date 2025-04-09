import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/@:username/:slug*", destination: "/user/:username/:slug*" },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
