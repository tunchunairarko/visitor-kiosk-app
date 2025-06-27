/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't use static export for development
  // output: 'export',
  distDir: '.next',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable experimental features for better compatibility with Electron
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig
