import { Box, Container, Grid, Paper, SxProps, Theme } from '@mui/material'
import apolloClient from 'apolloClient'
import AboutSection from 'components/about/AboutSection'
import ContactForm from 'components/contact/ContactForm'
import Background from 'components/home/Background'
import DownArrow from 'components/home/DownArrow'
import WelcomeMessage from 'components/home/WelcomeMessage'
import ProjectContainer from 'components/project/ProjectContainer'
import SkillContainer from 'components/skills/SkillContainer'
import { graphql } from 'generated'

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
    paddingTop: { xs: 0.5, md: 14 },
    paddingBottom: { xs: 2, md: 16 },
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
    backgroundColor: 'transparent',
    borderTop: '1px solid',
    borderColor: 'transparent',
    backdropFilter: 'none',
  },
}

const QUERY_PROJECTS = graphql(/* GraphQL */ `
  query ProjectsAndSkills {
    projects(first: 100, orderBy: createdAt_DESC) {
      id
      ...projectElement
    }
    skills(first: 100) {
      id
      ...skillElement
    }
    cvs(first: 1, orderBy: createdAt_DESC) {
      id
      document {
        id
        url
      }
    }
  }
`)

async function HomePage({ params }: HomePageProps) {
  const { data } = await apolloClient.query({ query: QUERY_PROJECTS })
  const projects = data?.projects ?? []
  const skills = data?.skills ?? []
  const cvUrl = data?.cvs?.[0]?.document?.url ?? ''
  const { lang } = await params

  return (
    <>
      <Background />
      <Box id={'home'} sx={style.hero}>
        <Container maxWidth={'md'}>
          <Grid container alignItems={'center'} justifyContent={'center'}>
            <Grid size={{ xs: 12 }}>
              <WelcomeMessage lang={lang} cvUrl={cvUrl} />
            </Grid>
          </Grid>
        </Container>
        <Box sx={style.scrollCue}>
          <DownArrow />
        </Box>
      </Box>
      <Paper square variant={'outlined'} sx={style.contentPaper}>
        <Container sx={{ paddingBottom: 6, paddingTop: { xs: 0, md: 10 }, '& > *': { paddingBottom: 12 } }}>
          <AboutSection lang={lang} />
          <SkillContainer skills={skills} lang={lang} />
          <ProjectContainer projects={projects} lang={lang} />
          <ContactForm lang={lang} />
        </Container>
      </Paper>
    </>
  )
}

export default HomePage
