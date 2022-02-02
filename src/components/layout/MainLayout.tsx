import React, { PropsWithChildren } from 'react'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'
import styles from 'styles/Home.module.css'

const MainLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  const { children } = props

  return (
    <>
      <NavBar />
      <div className={styles.mainTitle}>{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout
