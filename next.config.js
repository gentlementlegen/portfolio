// @ts-check
const { i18n } = require('./next-i18next.config')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  i18n,
  images: { domains: ['media.graphassets.com'] },
  // Used to limit the building speed and avoid 429 errors from the API
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  async redirects() {
    return [
      {
        source: '/svg-to-mui',
        destination: 'https://mui-svg-converter.vercel.app/',
        permanent: true,
      },
    ]
  },
}
