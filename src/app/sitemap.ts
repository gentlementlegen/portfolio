import { MetadataRoute } from 'next'
import { languages } from 'components/i18n/settings'
import { getSiteUrl } from 'lib/siteUrl'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return languages.map((lang) => ({
    url: `${siteUrl}/${lang}/`,
    lastModified,
  }))
}
