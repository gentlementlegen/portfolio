import React from 'react'
import { makeStyles } from '@mui/styles'
import { AppBar, Toolbar, Typography } from '@mui/material'

const useStyles = makeStyles({
  red: {
    backgroundColor: 'red',
  },
  navBarTitle: {
    flexGrow: 1,
  },
})

export default function Home() {
  const classes = useStyles()
  return (
    <AppBar position={'static'}>
      <Toolbar>
        <Typography variant={'h6'} component={'div'} className={classes.navBarTitle}>
          Portfolio
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
