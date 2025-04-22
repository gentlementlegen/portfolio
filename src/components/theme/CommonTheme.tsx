'use client'

import React, { PropsWithChildren } from 'react'
import { CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import apolloClient from 'apolloClient'
import ToggleColorMode from 'components/context/ColorModeContext'

interface CommonThemeProps {}

export default function CommonTheme({ children }: PropsWithChildren<CommonThemeProps>) {
  return (
    <ToggleColorMode>
      <ApolloProvider client={apolloClient}>
        <CssBaseline />
        {children}
      </ApolloProvider>
    </ToggleColorMode>
  )
}
