/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL ? `https://${process.env.SITE_URL}` : 'https://www.fernand-veyrier.xyz',
  generateRobotsTxt: true,
  // ...other options
  exclude: ['/admin'],
  robotsTxtOptions: {
    policies: [{ disallow: '/admin', userAgent: '*', allow: '/' }],
  },
}
