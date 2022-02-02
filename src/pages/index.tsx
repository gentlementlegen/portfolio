import React from 'react'
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ProjectContainer from 'components/project/ProjectContainer'
import MainLayout from 'components/layout/MainLayout'
import styles from 'styles/Home.module.css'
import theme from 'theme'

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.backgroundOverlay} />
      <video autoPlay muted loop id="backgroundVideo" className={styles.backgroundVideo}>
        <source src="backgroundVideo.mp4" type="video/mp4" />
      </video>
      <Container className={styles.mainGrid}>
        <Grid container className={styles.mainGrid} alignItems={'center'}>
          <Grid item xs={12} sx={{ color: theme.palette.secondary.main, textShadow: '1px 1px 5px black' }}>
            <Typography variant={'h1'} align={'center'} gutterBottom>
              Welcome to my portfolio
            </Typography>
            <Typography variant={'h5'} align={'center'}>
              I am <em>Fernand</em>, a dev lead in South Korea. Passionate about video-games, I currently work with
              React.js, Node.js, Typescript & GraphQl.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box display={'flex'} justifyContent={'center'} marginBottom={8}>
        <AnchorLink href={'#projects'}>
          <IconButton size={'large'} color={'secondary'}>
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </AnchorLink>
      </Box>
      <Paper variant={'elevation'} elevation={0}>
        <Container>
          <ProjectContainer />
        </Container>
      </Paper>
    </MainLayout>
  )
}
