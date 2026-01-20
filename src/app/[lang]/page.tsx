import React from 'react'
import { Box, Container, Grid, Paper, SxProps, Theme } from '@mui/material'
import { graphql } from 'generated'
import apolloClient from 'apolloClient'
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

const style: Record<'hero' | 'scrollCue' | 'contentPaper', SxProps<Theme>> = {
  hero: {
    minHeight: { xs: 'calc(100vh - 80px)', md: 'calc(100vh - 96px)' },
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingTop: { xs: 10, md: 14 },
    paddingBottom: { xs: 12, md: 16 },
  },
  scrollCue: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    bottom: { xs: 16, md: 24 },
    transform: 'translateX(-50%)',
  },
  contentPaper: {
    position: 'relative',
    backgroundColor: 'background.paper',
    borderTop: '1px solid',
    borderColor: 'divider',
    backdropFilter: 'blur(18px)',
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
  const { data } = await apolloClient.query({ query: QUERY_PROJECTS })
  const projects = data?.projects ?? []
  const skills = data?.skills ?? []
  const { lang } = await params

  return (
    <>
      <Background />
      <Box id={'home'} sx={style.hero}>
        <Container maxWidth={'md'}>
          <Grid container alignItems={'center'} justifyContent={'center'}>
            <Grid size={{ xs: 12 }}>
              <WelcomeMessage lang={lang} />
            </Grid>
          </Grid>
        </Container>
        <Box sx={style.scrollCue}>
          <DownArrow />
        </Box>
      </Box>
      <Paper square variant={'outlined'} sx={style.contentPaper}>
        <Container sx={{ paddingBottom: 6, paddingTop: 10, '& > *': { paddingBottom: 12 } }}>
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
