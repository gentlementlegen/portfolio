import React from 'react'
import 'styles/globals.css'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'theme'
import { ApolloProvider } from '@apollo/client'
import client from 'apolloClient'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
