import React from 'react'
import { NextPage } from 'next'

interface SvgToMuiPageProps {}

const SvgToMuiPage: NextPage<SvgToMuiPageProps> = () => {
  return (
    <iframe style={{ width: '100%', height: '100vh', border: 'none' }} src="https://mui-svg-converter.vercel.app/" />
  )
}

SvgToMuiPage.hideMainLayout = true

export default SvgToMuiPage
