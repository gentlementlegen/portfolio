'use client'

import React, { PropsWithChildren, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import AnchorLink, { AnchorLinkProps } from 'react-anchor-link-smooth-scroll'
import { useColorMode } from 'components/context/ColorModeContext'
import { useParams } from 'next/navigation'
import { DarkModeOutlined, LightModeOutlined, Menu } from '@mui/icons-material'
import { useTranslation } from 'components/i18n/client'
import { useTheme } from '@mui/material/styles'

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

export interface NavBarProps {
  lang: string
}

const NavBar = ({ lang }: NavBarProps) => {
  const { toggleColorMode } = useColorMode()
  const { t } = useTranslation(lang, 'common')
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = useState(false)

  const navLinks = [
    { label: t('about'), href: '#about' },
    { label: t('skills'), href: '#skills' },
    { label: t('projects'), href: '#projects' },
    { label: t('contact'), href: '#contact' },
  ]

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
    <AppBar position={'sticky'} elevation={0} color={'transparent'} sx={{ py: { xs: 1, md: 2 } }}>
      <Container maxWidth={'lg'}>
        <Paper
          variant={'outlined'}
          sx={{
            borderRadius: 999,
            px: { xs: 1.5, md: 3 },
            boxShadow: '0 18px 40px rgba(2, 6, 23, 0.35)',
          }}
        >
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 } }}>
            <Box display={{ xs: 'flex', md: 'none' }}>
              <IconButton
                sx={{ marginRight: 1, borderColor: 'transparent', backgroundColor: 'transparent' }}
                size="small"
                onClick={toggleDrawer(true)}
              >
                <Menu />
              </IconButton>
              <SwipeableDrawer
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                  sx: {
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    minWidth: 240,
                  },
                }}
              >
                <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  <List>
                    {navLinks.map((link) => (
                      <ListItem key={link.href}>
                        <LinkElement href={link.href} offset={96}>
                          <Button size={'small'} color={'inherit'}>
                            {link.label}
                          </Button>
                        </LinkElement>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </SwipeableDrawer>
            </Box>
            <Link href={'/'} passHref>
              <Typography
                variant={'h6'}
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'text.primary',
                }}
              >
                {'<Dev />'}
              </Typography>
            </Link>
            <Box flexGrow={1} />
            <Box display={{ xs: 'none', md: 'flex' }} alignItems={'center'} gap={1}>
              {navLinks.map((link) => (
                <LinkElement key={link.href} href={link.href} offset={96}>
                  <Button
                    size={'small'}
                    color={'inherit'}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                </LinkElement>
              ))}
            </Box>
            <IconButton
              sx={{ marginLeft: 1 }}
              size={'small'}
              color={'inherit'}
              onClick={toggleColorMode}
              aria-label={'toggle color mode'}
            >
              {theme.palette.mode === 'dark' ? <LightModeOutlined fontSize={'small'} /> : <DarkModeOutlined fontSize={'small'} />}
            </IconButton>
          </Toolbar>
        </Paper>
      </Container>
    </AppBar>
  )
}

export default NavBar
