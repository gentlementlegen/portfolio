import React, { PropsWithChildren } from 'react'
import NavBar from 'components/navbar/NavBar'

const MainLayout = (props: PropsWithChildren<unknown>): JSX.Element => {
  const { children } = props
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default MainLayout
