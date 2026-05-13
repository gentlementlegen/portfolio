/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // i18n,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'media.graphassets.com',
      },
      {
        hostname: 'us-east-1.graphassets.com',
      },
    ],
  },
}
