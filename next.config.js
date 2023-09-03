/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_CONTENT_REPOSITORY: process.env.GITHUB_CONTENT_REPOSITORY,
  }
}

module.exports = nextConfig
