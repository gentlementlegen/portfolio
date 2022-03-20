import React from 'react'
import 'styles/globals.css'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'theme'
import { ApolloProvider } from '@apollo/client'
import client from 'apolloClient'
import Footer from 'components/layout/Footer'
import ReactGA from 'react-ga4'
import NavBar from 'components/layout/NavBar'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('G-MKCJ96LVC7')
  ReactGA.send('pageview')
}

function MyApp({ Component, pageProps }: AppProps & { Component: { hideNavBar: boolean } }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        {!Component.hideNavBar && <NavBar />}
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
