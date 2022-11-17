import React from 'react'
import { Box, Container, Grid, IconButton, Paper, Typography, useTheme } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ProjectContainer from 'components/project/ProjectContainer'
import MainLayout from 'components/layout/MainLayout'
import styles from 'styles/Home.module.css'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import dbConnect from 'lib/dbConnect'
import SkillContainer from 'components/skills/SkillContainer'
import ContactSection from 'components/contact/ContactSection'
import AboutSection from 'components/about/AboutSection'
import ContactForm from 'components/contact/ContactForm'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import apolloClient from 'apolloClient'
import { gql } from '@apollo/client'
import { Project, Skill } from 'generated/graphql'

const QUERY_PROJECTS = gql`
  query ProjectsAndSkills {
    projects {
      id
      title
      slug
      image {
        id
        url
      }
    }
    skills {
      id
      name
      image {
        id
        url
      }
    }
  }
`

export const getStaticProps: GetStaticProps<{ projects: Project[]; skills: Skill[] }> = async ({ locale }) => {
  await dbConnect()

  const { data } = await apolloClient.query<{ projects: Project[]; skills: Skill[] }>({ query: QUERY_PROJECTS })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...data,
    },
  }
}

const style: { [k: string]: SxProps<Theme> } = {
  root: (theme) => ({
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
  }),
  projectContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    left: '50%',
    bottom: 8,
    transform: 'translateX(-50%)',
  },
  videoContainer: (theme) => ({
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
  }),
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { projects, skills } = props
  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <MainLayout>
      <Box id={'home'} sx={style.root} />
      <Box component={'video'} autoPlay muted loop preload="none" id="backgroundVideo" sx={style.videoContainer}>
        <source src="backgroundVideo.mp4" type="video/mp4" />
      </Box>
      <Container className={styles.mainGrid}>
        <Grid container className={styles.mainGrid} alignItems={'center'}>
          <Grid item xs={12} sx={{ color: theme.palette.secondary.main, textShadow: '1px 1px 5px black' }}>
            <Typography variant={'h1'} component={'h2'} align={'center'} gutterBottom color={'#ffffff'}>
              {t('h1')}
            </Typography>
            <Typography variant={'h5'} component={'h1'} align={'center'} color={'#ffffff'}>
              <Trans i18nKey={'h2'}>
                I am <em style={{ color: 'rgb(178, 178, 178)' }}>Fernand</em>, a dev lead in South Korea. Passionate
                about video-games, I currently work with React.js, Node.js, Typescript & GraphQl.
              </Trans>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box sx={style.projectContainer}>
        <AnchorLink href={'#projects'} offset={100}>
          <IconButton size={'large'} color={'secondary'}>
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </AnchorLink>
      </Box>
      <Paper square sx={{ position: 'relative' }}>
        <Container sx={{ paddingBottom: theme.spacing(6), '& > *': { paddingBottom: 12 } }}>
          <ProjectContainer projects={projects} />
          <SkillContainer skills={skills} />
          <AboutSection />
          <ContactSection />
          <ContactForm />
        </Container>
      </Paper>
    </MainLayout>
  )
}
