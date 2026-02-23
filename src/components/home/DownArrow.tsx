'use client'

import React, { useEffect, useState } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Box, IconButton } from '@mui/material'
import { KeyboardArrowDownRounded } from '@mui/icons-material'

export default function DownArrow() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <Box
      component={AnchorLink}
      href={'#about'}
      offset={100}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      sx={{
        display: { xs: 'none', md: 'inline-flex' },
        alignItems: 'center',
        justifyContent: 'center',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition: 'opacity 0.35s ease',
      }}
    >
      <IconButton size={'large'} color={'secondary'}>
        <KeyboardArrowDownRounded />
      </IconButton>
    </Box>
  )
}
