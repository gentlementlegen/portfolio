'use client'

import React, { useEffect, useState } from 'react'
import AnchorLink, { AnchorLinkProps } from 'react-anchor-link-smooth-scroll'
import { Box, IconButton } from '@mui/material'
import { KeyboardArrowDownRounded } from '@mui/icons-material'

interface DownArrowProps extends AnchorLinkProps {}

export default function DownArrow(props: DownArrowProps) {
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
    /*We ignore this error because it is due to the new children type in React and this lib is not up-to-date*/
    /*@ts-ignore*/
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
      {/*We ignore this error because it is due to the new children type in React and this lib is not up-to-date*/}
      {/*@ts-ignore*/}
      <IconButton size={'large'} color={'secondary'}>
        <KeyboardArrowDownRounded />
      </IconButton>
    </Box>
  )
}
