import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Theme from 'pages/theme'

const useStyles = makeStyles<typeof Theme>((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))
const Footer = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant={'caption'} align={'center'} component={'p'}>
        Games are love, games are life | Copyright Fernand Veyrier, {new Date().getFullYear()}
      </Typography>
    </div>
  )
}

export default Footer
