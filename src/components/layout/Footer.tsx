import React from 'react'
import { Paper, Switch, Typography } from '@mui/material'
import { ColorModeContext } from 'components/context/ColorModeContext'

const Footer = (): JSX.Element => {
  const { toggleColorMode } = React.useContext(ColorModeContext)

  const handleSwitchChange = () => {
    toggleColorMode()
  }

  return (
    <Paper
      square
      elevation={0}
      sx={{
        padding: 2,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 1,
      }}
    >
      <Typography variant={'caption'} align={'center'} component={'p'}>
        Games are love, games are life | Copyright Fernand Veyrier, {new Date().getFullYear()}
      </Typography>
      <Switch size={'small'} color={'secondary'} onChange={handleSwitchChange} />
    </Paper>
  )
}

export default Footer
