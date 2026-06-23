// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows importing SVGs as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  // Image domains — add any external image sources here later
  images: {
    domains: ['cdn.sanity.io'],
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig