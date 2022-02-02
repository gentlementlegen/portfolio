import React from 'react'
import { Box, Typography } from '@mui/material'
import theme from 'theme'

const Footer = (): JSX.Element => {
  return (
    <Box
      sx={{
        padding: theme.spacing(2),
      }}
    >
      <Typography variant={'caption'} align={'center'} component={'p'}>
        Games are love, games are life | Copyright Fernand Veyrier, {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}

export default Footer
