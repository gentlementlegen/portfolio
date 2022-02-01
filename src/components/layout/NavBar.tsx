import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'

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
        <Link href={'/'} passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href={'/about'} passHref>
          <Button color="inherit">About</Button>
        </Link>
        <Link href={'/contact'} passHref>
          <Button color="inherit">Contact</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
