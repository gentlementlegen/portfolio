const path = require('path')
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ko'],
    localePath: path.resolve('./public/locales'),
  },
}
