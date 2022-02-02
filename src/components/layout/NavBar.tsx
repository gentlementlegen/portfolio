import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

const NavBar = (): JSX.Element => {
  return (
    <AppBar position={'sticky'}>
      <Head>
        <title>Fernand&apos;d Portfolio</title>
      </Head>
      <Toolbar>
        <Typography variant={'h6'} component={'div'} className={styles.navBarTitle}>
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
