import { MetadataRoute } from 'next'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : 'https://www.fernand-veyrier.xyz'

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ]
}
