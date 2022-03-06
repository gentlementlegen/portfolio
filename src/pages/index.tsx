import React from 'react'
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ProjectContainer from 'components/project/ProjectContainer'
import MainLayout from 'components/layout/MainLayout'
import styles from 'styles/Home.module.css'
import theme from 'theme'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Game } from 'lib/models/Game'
import { resolvers } from 'pages/api/graphql'
import dbConnect from 'lib/dbConnect'

export const getStaticProps: GetStaticProps<{ projects: Game[] }> = async () => {
  await dbConnect()
  const projects = await resolvers.Query.allProjects()

  return {
    props: {
      projects: projects.map((o) => ({ category: o.category, description: o.description, id: o.id, title: o.title })),
    },
  }
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { projects } = props
  return (
    <MainLayout>
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          top: 64,
          [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
            top: 56,
          },
          width: '100%',
          position: 'absolute',
          zIndex: -2,
          backgroundColor: 'black',
          opacity: 0.7,
        }}
      />
      <Box
        component={'video'}
        autoPlay
        muted
        loop
        preload="none"
        id="backgroundVideo"
        sx={{
          height: 'calc(100vh - 64px)',
          top: 64,
          [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
            top: 56,
          },
          width: '100%',
          position: 'fixed',
          zIndex: -3,
          objectFit: 'cover',
          filter: 'blur(4px)',
          msFilter: 'blur(4px)',
          webkitFilter: 'blur(4px)',
        }}
      >
        <source src="backgroundVideo.mp4" type="video/mp4" />
      </Box>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          left: '50%',
          bottom: 8,
          transform: 'translateX(-50%)',
        }}
      >
        <AnchorLink href={'#projects'} offset={100}>
          <IconButton size={'large'} color={'secondary'}>
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </AnchorLink>
      </Box>
      <Paper square sx={{ position: 'relative' }}>
        <Container>
          <ProjectContainer projects={projects} />
        </Container>
      </Paper>
    </MainLayout>
  )
}
