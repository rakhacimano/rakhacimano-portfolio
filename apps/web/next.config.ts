import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile workspace packages
  transpilePackages: ['@repo/db'],

  // External packages for server-side (sharp for image processing)
  serverExternalPackages: ['sharp'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ppmplykbiwnftsrrxbuw.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
    ],
  },
  // @ts-expect-error - eslint config is valid but types might be outdated
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

