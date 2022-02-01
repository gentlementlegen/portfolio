import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  navBarTitle: {
    flexGrow: 1,
  },
})

const NavBar = (): JSX.Element => {
  const classes = useStyles()

  return (
    <AppBar position={'sticky'}>
      <Head>
        <title>Fernand&apos;d Portfolio</title>
      </Head>
      <Toolbar>
        <Typography variant={'h6'} component={'div'} className={classes.navBarTitle}>
          Portfolio
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About me</Button>
        <Button color="inherit">Contact</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
