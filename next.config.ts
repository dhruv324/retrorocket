import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['www.kindpng.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
