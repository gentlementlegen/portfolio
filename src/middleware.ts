import { NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { cookieName, fallbackLng, languages } from 'components/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: ['/((?!_next|.*.mp4|.*.ico).*)'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/svg-to-mui')) {
    return Response.redirect('https://mui-svg-converter.vercel.app/')
  }

  const pathnameHasLocale = languages.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return Response.redirect(request.nextUrl)
}

export function getLocale(req: NextRequest) {
  let lng: string | null = null
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  return lng
}
