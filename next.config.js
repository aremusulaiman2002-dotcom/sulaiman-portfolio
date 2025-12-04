/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracingRoot: __dirname,
  // Disable static generation for now to avoid issues
  output: 'standalone',
}

module.exports = nextConfig