import React, { PropsWithChildren } from 'react'
import styles from 'styles/Home.module.css'
// eslint-disable-next-line import/named
import { Box, BoxProps } from '@mui/system'

const MainLayout = (props: PropsWithChildren<BoxProps>): JSX.Element => {
  const { children, ...rest } = props

  return (
    <Box className={styles.mainTitle} {...rest}>
      {children}
    </Box>
  )
}

export default MainLayout
