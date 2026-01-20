'use client'

import React from 'react'
import { Box } from '@mui/material'

export default function Background() {
  return (
    <Box
      sx={(theme) => {
        const gridColor =
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.08)'
        const glowOne = theme.palette.mode === 'dark' ? 'rgba(90, 120, 255, 0.22)' : 'rgba(63, 92, 190, 0.15)'
        const glowTwo = theme.palette.mode === 'dark' ? 'rgba(110, 200, 255, 0.16)' : 'rgba(56, 148, 207, 0.12)'
        return {
          position: 'fixed',
          inset: 0,
          zIndex: -3,
          pointerEvents: 'none',
          backgroundColor: theme.palette.background.default,
          backgroundImage: `
            radial-gradient(circle at 20% 15%, ${glowOne}, transparent 42%),
            radial-gradient(circle at 80% 10%, ${glowTwo}, transparent 38%),
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
          backgroundPosition: '0 0, 0 0, -1px -1px, -1px -1px',
        }
      }}
    />
  )
}
