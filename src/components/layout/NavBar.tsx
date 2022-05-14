import React from 'react'
import { AppBar, Button, Link as MuiLink, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const NavBar = (): JSX.Element => {
  return (
    <AppBar position={'sticky'} sx={{ backgroundImage: 'none' }}>
      <Head>
        <title>Fernand Veyrier</title>
      </Head>
      <Toolbar>
        <Link href={'/'} passHref>
          <MuiLink className={styles.navBarTitle} color={'secondary'} underline={'none'}>
            <Typography variant={'h6'} component={'div'} className={styles.navBarTitle}>
              Portfolio
            </Typography>
          </MuiLink>
        </Link>
        <AnchorLink href={'#home'} offset={100}>
          <Button color={'inherit'}>Home</Button>
        </AnchorLink>
        <AnchorLink href={'#about'} offset={100}>
          <Button color={'inherit'}>About</Button>
        </AnchorLink>
        <AnchorLink href={'#contact'} offset={100}>
          <Button color={'inherit'}>Contact</Button>
        </AnchorLink>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
