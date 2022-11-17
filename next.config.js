const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: true,
  i18n,
  images: { domains: ['media.graphassets.com'] },
  typescript: {
    ignoreBuildErrors: true,
  },
}
