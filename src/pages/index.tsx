import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Card, CardActionArea, CardContent, Container, Grid, IconButton, Typography } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import NavBar from '../components/navbar/NavBar'

const useStyles = makeStyles({
  red: {
    backgroundColor: 'red',
  },
  mainTitle: {
    height: `calc(100vh - 112px)`,
  },
})

export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Container>
        <Grid container className={classes.mainTitle} alignItems={'center'}>
          <Grid item xs={12}>
            <Typography variant={'h1'} align={'center'} gutterBottom>
              Welcome to my portfolio
            </Typography>
            <Typography variant={'h5'} align={'center'}>
              I am <em>Fernand</em>, a dev lead in South Korea. Passionate about video-games, I currently work with
              React.js, Node.js & GraphQl.
            </Typography>
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent={'center'}>
          <AnchorLink href={'#projects'}>
            <IconButton size={'large'}>
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
          </AnchorLink>
        </Box>
        <Grid container justifyContent={'center'} id={'projects'}>
          <Grid item xs={4}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography>Project 1</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
