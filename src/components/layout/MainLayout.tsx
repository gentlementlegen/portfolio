import React, { PropsWithChildren } from 'react'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  mainTitle: {
    minHeight: `calc(100vh - 116px)`,
  },
}))

const MainLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  const { children } = props
  const classes = useStyles()

  return (
    <>
      <NavBar />
      <div className={classes.mainTitle}>{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout
