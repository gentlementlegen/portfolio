/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  // i18n,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
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
