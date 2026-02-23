'use client'

import React, { PropsWithChildren } from 'react'
import { CssBaseline } from '@mui/material'
import ToggleColorMode from 'components/context/ColorModeContext'

export default function CommonTheme({ children }: PropsWithChildren) {
  return (
    <ToggleColorMode>
      <CssBaseline />
      {children}
    </ToggleColorMode>
  )
}
