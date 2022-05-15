import React, { PropsWithChildren } from 'react'
import { AppBar, Button, Link as MuiLink, Switch, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import AnchorLink, { AnchorLinkProps } from 'react-anchor-link-smooth-scroll'
import { ColorModeContext } from 'components/context/ColorModeContext'
import { useRouter } from 'next/router'

const LinkElement = ({ children, href, offset }: PropsWithChildren<AnchorLinkProps>) => {
  const { route } = useRouter()

  return route !== '/' ? (
    <Link href={`/${href}`} passHref>
      {children}
    </Link>
  ) : (
    <AnchorLink href={href} offset={offset}>
      {children}
    </AnchorLink>
  )
}

const NavBar = (): JSX.Element => {
  const { toggleColorMode } = React.useContext(ColorModeContext)

  const handleSwitchChange = () => {
    toggleColorMode()
  }

  return (
    <AppBar position={'sticky'} sx={{ backgroundImage: 'none' }}>
      <Head>
        <title>Fernand Veyrier</title>
      </Head>
      <Toolbar>
        <Link href={'/'} passHref>
          <MuiLink className={styles.navBarTitle} color={'secondary'} underline={'none'}>
            <Typography variant={'h6'} component={'div'} className={styles.navBarTitle}>
              Fernand Veyrier
            </Typography>
          </MuiLink>
        </Link>
        <LinkElement href={'#home'} offset={100}>
          <Button color={'inherit'}>Home</Button>
        </LinkElement>
        <LinkElement href={'#about'} offset={100}>
          <Button color={'inherit'}>About</Button>
        </LinkElement>
        <LinkElement href={'#contact'} offset={100}>
          <Button color={'inherit'}>Contact</Button>
        </LinkElement>
        <Switch size={'small'} color={'secondary'} onChange={handleSwitchChange} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
