import React from 'react'
import { Paper, Typography } from '@mui/material'

const Footer = (): JSX.Element => {
  return (
    <footer>
      <Paper
        square
        elevation={0}
        sx={{
          padding: 2,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 1,
        }}
      >
        <Typography variant={'caption'} align={'center'} component={'p'}>
          Games are love, games are life | Copyright Fernand Veyrier, {new Date().getFullYear()}
        </Typography>
      </Paper>
    </footer>
  )
}

export default Footer
