import React from 'react'
import MainLayout from 'components/layout/MainLayout'
import CommonTheme from 'components/theme/CommonTheme'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'
import ReactGA from 'react-ga4'
import { dir } from 'i18next'
import { languages } from 'components/i18n/settings'
import { CookiesProvider } from 'next-client-cookies/server'

//         <link rel="manifest" href="/site.webmanifest" />
//         <meta property="og:image" content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/background.png`} />
//         <meta property="og:image:secure_url" content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/background.png`} />
//         <meta property="og:image:type" content="image/png" />
//         <meta property="og:image:width" content="1024" />
//         <meta property="og:image:height" content="576" />

export const metadata = {
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`),
  alternates: {
    canonical: '/',
    languages: {
      en: 'en',
      fr: 'fr',
      ko: 'ko',
    },
  },
  title: 'Fernand Veyrier',
  description:
    'I am Fernand Veyrier, gameplay and fullstack programmer. This portfolio mostly focuses on video games and personal projects.',
  openGraph: {
    title: 'Fernand Veyrier',
    description:
      'I am Fernand Veyrier, gameplay and fullstack programmer. This portfolio mostly focuses on video games and personal projects.',
    images: '/background.png',
  },
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('G-MKCJ96LVC7')
  ReactGA.send('pageview')
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang} dir={dir(params.lang)}>
      <body>
        <CookiesProvider>
          <CommonTheme>
            <NavBar lang={params.lang} />
            <MainLayout>{children}</MainLayout>
            <Footer />
          </CommonTheme>
        </CookiesProvider>
      </body>
    </html>
  )
}
