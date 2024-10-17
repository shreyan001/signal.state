/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during the build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during the build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['robohash.org'],
  },
};

export default nextConfig;
