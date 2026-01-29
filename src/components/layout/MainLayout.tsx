import React, { JSX, PropsWithChildren } from 'react'
import { Box, BoxProps } from '@mui/material'

const MainLayout = (props: PropsWithChildren<BoxProps>): JSX.Element => {
  const { children, sx, ...rest } = props

  return (
    <Box
      sx={[
        {
          minHeight: '100vh',
          position: 'relative',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default MainLayout
