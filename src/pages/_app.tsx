import React from 'react'
import '../../styles/globals.css'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
