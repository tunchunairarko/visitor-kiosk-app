/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't use static export for development
  // output: 'export',
  distDir: '.next',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Specify the src directory for Next.js
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable experimental features for better compatibility with Electron
  experimental: {
    esmExternals: false
  },
  // Webpack configuration for native modules
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize native modules for server-side builds
      config.externals.push({
        'sqlite3': 'commonjs sqlite3'
      })
    }
    return config
  }
}

module.exports = nextConfig
