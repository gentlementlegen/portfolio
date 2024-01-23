'use client'

import React from 'react'
import AnchorLink, { AnchorLinkProps } from 'react-anchor-link-smooth-scroll'
import { IconButton } from '@mui/material'
import { KeyboardArrowDownRounded } from '@mui/icons-material'

interface DownArrowProps extends AnchorLinkProps {}

export default function DownArrow(props: DownArrowProps) {
  return (
    <AnchorLink href={'#projects'} offset={100}>
      {/*We ignore this error because it is due to the new children type in React and this lib is not up-to-date*/}
      {/*@ts-ignore*/}
      <IconButton size={'large'} color={'secondary'}>
        <KeyboardArrowDownRounded />
      </IconButton>
    </AnchorLink>
  )
}
