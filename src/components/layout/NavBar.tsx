'use client'

import React, { PropsWithChildren, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  styled,
  SwipeableDrawer,
  Switch,
  SwitchProps,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import AnchorLink, { AnchorLinkProps } from 'react-anchor-link-smooth-scroll'
import { useColorMode } from 'components/context/ColorModeContext'
import { useParams } from 'next/navigation'
import { Menu } from '@mui/icons-material'
import { useTranslation } from 'components/i18n/client'

const LinkElement = ({ children, href, offset }: PropsWithChildren<Omit<AnchorLinkProps, 'children'>>) => {
  const { category } = useParams()

  return category ? (
    <Link href={`/${href}`} passHref>
      {children}
    </Link>
  ) : (
    // @ts-ignore
    <AnchorLink href={href} offset={offset}>
      {children as string}
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
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width=\"16\" height=\"16\" viewBox=\"0 0 1000 1000\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M500,188C328,188,188,328,188,500C188,672,328,813,500,813C672,813,813,672,813,500C813,328,672,188,500,188zM500,688C397,688,313,603,313,500C313,397,397,313,500,313C603,313,688,397,688,500C688,603,603,688,500,688zM438,0H563V125H438zM438,875H563V1000H438zM875,438H1000V563H875zM0,438H125V563H0zM721,809L809,721L898,809L809,898zM102,191L191,102L279,191L191,279zM102,809L191,721L279,809L191,898zM721,191L809,102L898,191L809,279z\"/></svg>')`,
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
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" fill=\"white\"><path d=\"m275.4,500.7c-135,0-244.7-109.8-244.7-244.7 1.06581e-14-134.9 109.8-244.7 244.7-244.7 8.2,0 16.4,0.4 24.6,1.2 7.2,0.7 13.5,5.2 16.5,11.7s2.4,14.2-1.6,20.2c-23,33.8-35.2,73.3-35.2,114.2 0,105 78.7,192.2 183.2,202.6 7.2,0.7 13.5,5.2 16.5,11.7 3.1,6.5 2.4,14.2-1.6,20.2-45.8,67.4-121.4,107.6-202.4,107.6zm-12.5-448c-106.5,6.5-191.2,95.2-191.2,203.3 1.42109e-14,112.3 91.4,203.7 203.7,203.7 56.4,0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6 0.1-37.1 8.4-73.2 24.3-106.1z\"/></svg>')`,
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

export interface NavBarProps {
  lang: string
}

const NavBar = ({ lang }: NavBarProps) => {
  const { toggleColorMode } = useColorMode()
  const { t } = useTranslation(lang, 'common')
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleSwitchChange = () => {
    toggleColorMode()
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(open)
  }

  return (
    <AppBar position={'sticky'} sx={{ backgroundImage: 'none' }}>
      <Toolbar>
        <Box visibility={{ md: 'hidden' }}>
          <IconButton sx={{ marginRight: 1 }} size="small" onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
          <SwipeableDrawer open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <List>
                <ListItem>
                  <LinkElement href={'#home'} offset={100}>
                    <Button color={'inherit'}>{t('home')}</Button>
                  </LinkElement>
                </ListItem>
                <ListItem>
                  <LinkElement href={'#about'} offset={100}>
                    <Button color={'inherit'}>{t('about')}</Button>
                  </LinkElement>
                </ListItem>
                <ListItem>
                  <LinkElement href={'#contact'} offset={100}>
                    <Button color={'inherit'}>{t('contact')}</Button>
                  </LinkElement>
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>
        </Box>
        <Link href={'/'} passHref>
          <Typography variant={'h6'} className={styles.navBarTitle} color={'secondary'}>
            Fernand Veyrier
          </Typography>
        </Link>
        <Box flexGrow={1} />
        <Box display={{ xs: 'none', md: 'block' }}>
          <LinkElement href={'#home'} offset={100}>
            <Button color={'inherit'}>{t('home')}</Button>
          </LinkElement>
          <LinkElement href={'#about'} offset={100}>
            <Button color={'inherit'}>{t('about')}</Button>
          </LinkElement>
          <LinkElement href={'#contact'} offset={100}>
            <Button color={'inherit'}>{t('contact')}</Button>
          </LinkElement>
        </Box>
        <CustomSwitch sx={{ marginLeft: 1 }} size={'small'} color={'secondary'} onChange={handleSwitchChange} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
