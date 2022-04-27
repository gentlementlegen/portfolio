import React from 'react'
import 'styles/globals.css'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { ApolloProvider } from '@apollo/client'
import client from 'apolloClient'
import Footer from 'components/layout/Footer'
import ReactGA from 'react-ga4'
import NavBar from 'components/layout/NavBar'
import Head from 'next/head'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'createEmotionCache'
import ToggleColorMode from 'components/context/ColorModeContext'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('G-MKCJ96LVC7')
  ReactGA.send('pageview')
}

const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppProps & { Component: { hideNavBar: boolean }; emotionCache: EmotionCache }) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props
  const theme = useTheme()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Fernand Veyrier</title>
        <meta
          name="description"
          content="I am Fernand Veyrier, gameplay and fullstack programmer. This portfolio mostly focuses on video games and personal projects."
        />
        <meta property="og:title" content="Fernand Veyrier" key="title" />
      </Head>
      <meta
        property="og:description"
        content="I am Fernand Veyrier, gameplay and fullstack programmer. This portfolio mostly focuses on video games and personal projects."
        key="description"
      />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          {!Component.hideNavBar && <NavBar />}
          <Component {...pageProps} key={router.asPath} />
          <Footer />
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default function MainApp(props: AppProps & { Component: { hideNavBar: boolean }; emotionCache: EmotionCache }) {
  return (
    <ToggleColorMode>
      <MyApp {...props} />
    </ToggleColorMode>
  )
}
