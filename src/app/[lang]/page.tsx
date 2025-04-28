import React from 'react'
import { Box, Container, Paper, SxProps, Theme, Grid } from '@mui/material'
import { graphql } from 'generated'
import apolloClient from 'apolloClient'
import styles from 'styles/Home.module.css'
import ContactForm from 'components/contact/ContactForm'
import ContactSection from 'components/contact/ContactSection'
import AboutSection from 'components/about/AboutSection'
import SkillContainer from 'components/skills/SkillContainer'
import ProjectContainer from 'components/project/ProjectContainer'
import WelcomeMessage from 'components/home/WelcomeMessage'
import DownArrow from 'components/home/DownArrow'
import Background from 'components/home/Background'

interface HomePageProps {
  params: Promise<{
    lang: string
  }>
}

const style: Record<'root' | 'projectContainer' | 'videoContainer', SxProps<Theme>> = {
  root: {
    height: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 64px)' },
    top: { sx: 56, md: 64 },
    width: '100%',
    position: 'absolute',
    zIndex: -2,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  projectContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    left: '50%',
    bottom: 8,
    transform: 'translateX(-50%)',
  },
  videoContainer: {
    height: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 64px)' },
    top: { sx: 56, md: 64 },
    width: '100%',
    position: 'fixed',
    zIndex: -3,
    objectFit: 'cover',
    filter: 'blur(4px)',
    msFilter: 'blur(4px)',
    webkitFilter: 'blur(4px)',
  },
}

const QUERY_PROJECTS = graphql(/* GraphQL */ `
  query ProjectsAndSkills {
    projects(first: 100) {
      id
      ...projectElement
    }
    skills {
      id
      ...skillElement
    }
  }
`)

async function HomePage({ params }: HomePageProps) {
  const {
    data: { projects, skills },
  } = await apolloClient.query({ query: QUERY_PROJECTS })
  const { lang } = await params

  return (
    <>
      <Box id={'home'} sx={style.root} />
      <Background projects={projects} />
      <Container className={styles.mainGrid}>
        <Grid container className={styles.mainGrid} alignItems={'center'}>
          <Grid size={{ xs: 12 }} sx={{ color: 'secondary.main', textShadow: '1px 1px 5px black' }}>
            <WelcomeMessage lang={lang} />
          </Grid>
        </Grid>
      </Container>
      <Box sx={style.projectContainer}>
        <DownArrow />
      </Box>
      <Paper square sx={{ position: 'relative' }}>
        <Container sx={{ paddingBottom: 6, '& > *': { paddingBottom: 12 } }}>
          <ProjectContainer projects={projects} />
          <SkillContainer skills={skills} lang={lang} />
          <AboutSection lang={lang} />
          <ContactSection lang={lang} />
          <ContactForm lang={lang} />
        </Container>
      </Paper>
    </>
  )
}

export default HomePage
