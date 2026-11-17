/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [process.env.PUBLIC_DOMAIN, process.env.LOCAL_DOMAIN].filter(Boolean),
}

module.exports = nextConfig
