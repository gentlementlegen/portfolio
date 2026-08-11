const DEFAULT_SITE_URL = 'https://www.fernand-veyrier.xyz'

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL

  if (!rawUrl) {
    return DEFAULT_SITE_URL
  }

  const normalizedUrl = rawUrl.replace(/\/$/, '')
  return /^https?:\/\//.test(normalizedUrl) ? normalizedUrl : `https://${normalizedUrl}`
}
