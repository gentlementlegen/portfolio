import React, { PropsWithChildren } from 'react'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'
import styles from 'styles/Home.module.css'
import { Box, BoxProps } from '@mui/material'

const MainLayout = (props: PropsWithChildren<BoxProps>): JSX.Element => {
  const { children, ...rest } = props

  return (
    <>
      <NavBar />
      <Box className={styles.mainTitle} {...rest}>
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default MainLayout
