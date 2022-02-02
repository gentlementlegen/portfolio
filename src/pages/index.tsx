import React from 'react'
import { Box, Container, Grid, IconButton, Typography } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ProjectContainer from 'components/project/ProjectContainer'
import MainLayout from 'components/layout/MainLayout'
import styles from 'styles/Home.module.css'

export default function Home() {
  return (
    <MainLayout>
      <Container>
        <Grid container className={styles.mainGrid} alignItems={'center'}>
          <Grid item xs={12}>
            <Typography variant={'h1'} align={'center'} gutterBottom>
              Welcome to my portfolio
            </Typography>
            <Typography variant={'h5'} align={'center'}>
              I am <em>Fernand</em>, a dev lead in South Korea. Passionate about video-games, I currently work with
              React.js, Node.js, Typescript & GraphQl.
            </Typography>
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent={'center'} marginBottom={8}>
          <AnchorLink href={'#projects'}>
            <IconButton size={'large'}>
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
          </AnchorLink>
        </Box>
        <ProjectContainer />
      </Container>
    </MainLayout>
  )
}
