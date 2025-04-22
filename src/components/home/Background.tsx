'use client'

import React from 'react'
import { Box, NoSsr, SxProps, Theme } from '@mui/material'
import { BrowserView, MobileView } from 'react-device-detect'
import CrossFadeImage from 'components/images/CrossFadeImage'
import { FragmentType, getFragmentData } from 'generated'
import { ProjectElementFragmentDoc } from 'generated/graphql'
import { ProjectElement } from 'components/project/project.operations'

interface BackgroundProps {
  projects: FragmentType<typeof ProjectElement>[]
}

const style: Record<'videoContainer', SxProps<Theme>> = {
  videoContainer: {
    height: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 64px)' },
    top: { sx: 56, md: 64 },
    width: '100%',
    position: 'fixed',
    zIndex: -3,
    objectFit: 'cover',
    filter: 'blur(4px)',
    msFilter: 'blur(4px)',
    webkitFilter: 'blur(4px)',
  },
}

export default function Background({ projects }: BackgroundProps) {
  return (
    <NoSsr>
      <BrowserView>
        <Box component={'video'} autoPlay muted loop preload="none" id="backgroundVideo" sx={style.videoContainer}>
          <source src="/backgroundVideo.mp4" type="video/mp4" />
        </Box>
      </BrowserView>
      <MobileView>
        <Box sx={style.videoContainer}>
          <CrossFadeImage images={getFragmentData(ProjectElementFragmentDoc, projects).map((o) => o.image.url)} />
        </Box>
      </MobileView>
    </NoSsr>
  )
}
