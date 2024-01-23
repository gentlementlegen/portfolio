/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  // i18n,
  images: {
    remotePatterns: [
      {
        hostname: 'media.graphassets.com',
      },
    ],
  },
}
