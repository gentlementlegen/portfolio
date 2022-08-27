import React, { PropsWithChildren } from 'react'
import { AppBar, Button, Link as MuiLink, styled, Switch, SwitchProps, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import AnchorLink, { AnchorLinkProps } from 'react-anchor-link-smooth-scroll'
import { ColorModeContext } from 'components/context/ColorModeContext'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

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

const CustomSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb:before': {
        backgroundImage: 'url(/sun.svg)',
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#a6a6a6',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    backgroundColor: theme.palette.mode === 'dark' ? '#151515' : '',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      padding: 4,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: 'url(/moon.svg)',
      backgroundOrigin: 'content-box',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

const NavBar = (): JSX.Element => {
  const { toggleColorMode } = React.useContext(ColorModeContext)
  const { t } = useTranslation('common')

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
          <Button color={'inherit'}>{t('home')}</Button>
        </LinkElement>
        <LinkElement href={'#about'} offset={100}>
          <Button color={'inherit'}>{t('about')}</Button>
        </LinkElement>
        <LinkElement href={'#contact'} offset={100}>
          <Button color={'inherit'}>{t('contact')}</Button>
        </LinkElement>
        <CustomSwitch size={'small'} color={'secondary'} onChange={handleSwitchChange} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
