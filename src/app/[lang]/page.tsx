import React from 'react'
import { Box, Container, Grid, NoSsr, Paper, SxProps, Theme } from '@mui/material'
import { BrowserView, MobileView } from 'react-device-detect'
import CrossFadeImage from 'components/images/CrossFadeImage'
import { getFragmentData, graphql } from 'generated'
import { ProjectElementFragmentDoc } from 'generated/graphql'
import apolloClient from 'apolloClient'
import styles from 'styles/Home.module.css'
import ContactForm from 'components/contact/ContactForm'
import ContactSection from 'components/contact/ContactSection'
import AboutSection from 'components/about/AboutSection'
import SkillContainer from 'components/skills/SkillContainer'
import ProjectContainer from 'components/project/ProjectContainer'

interface HomePageProps {}

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

async function HomePage(props: HomePageProps) {
  const {
    data: { projects, skills },
  } = await apolloClient.query({ query: QUERY_PROJECTS })
  // const { t } = useTranslation('common')

  return (
    <>
      <Box id={'home'} sx={style.root} />
      <NoSsr>
        <BrowserView>
          <Box component={'video'} autoPlay muted loop preload="none" id="backgroundVideo" sx={style.videoContainer}>
            <source src="../../../public/backgroundVideo.mp4" type="video/mp4" />
          </Box>
        </BrowserView>
        <MobileView>
          <Box sx={style.videoContainer}>
            <CrossFadeImage images={getFragmentData(ProjectElementFragmentDoc, projects).map((o) => o.image.url)} />
          </Box>
        </MobileView>
      </NoSsr>
      <Container className={styles.mainGrid}>
        <Grid container className={styles.mainGrid} alignItems={'center'}>
          <Grid item xs={12} sx={{ color: 'secondary.main', textShadow: '1px 1px 5px black' }}>
            {/*<motion.div*/}
            {/*  initial={{ opacity: 0, translateY: 16 }}*/}
            {/*  animate={{ opacity: 1, translateY: 0 }}*/}
            {/*  transition={{ duration: 0.5, ease: 'easeInOut' }}*/}
            {/*>*/}
            {/*  <Typography variant={'h1'} component={'h2'} align={'center'} gutterBottom color={'#ffffff'}>*/}
            {/*    {t('h1')}*/}
            {/*  </Typography>*/}
            {/*</motion.div>*/}
            {/*<motion.div*/}
            {/*  initial={{ opacity: 0, translateY: 16 }}*/}
            {/*  animate={{ opacity: 1, translateY: 0 }}*/}
            {/*  transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}*/}
            {/*>*/}
            {/*  <Typography variant={'h5'} component={'h1'} align={'center'} color={'#ffffff'}>*/}
            {/*    <Trans i18nKey={'h2'}>*/}
            {/*      I am <em style={{ color: 'rgb(178, 178, 178)' }}>Fernand</em>, a dev lead in South Korea. Passionate*/}
            {/*      about video-games, I currently work with React.js, Node.js, Typescript & GraphQl.*/}
            {/*    </Trans>*/}
            {/*  </Typography>*/}
            {/*</motion.div>*/}
          </Grid>
        </Grid>
      </Container>
      <Box sx={style.projectContainer}>
        {/*<AnchorLink href={'#projects'} offset={100}>*/}
        {/*  /!*We ignore this error because it is due to the new children type in React and this lib is not up-to-date*!/*/}
        {/*  /!*@ts-ignore*!/*/}
        {/*  <IconButton size={'large'} color={'secondary'}>*/}
        {/*    <KeyboardArrowDownRoundedIcon />*/}
        {/*  </IconButton>*/}
        {/*</AnchorLink>*/}
      </Box>
      <Paper square sx={{ position: 'relative' }}>
        <Container sx={{ paddingBottom: 6, '& > *': { paddingBottom: 12 } }}>
          <ProjectContainer projects={projects} />
          <SkillContainer skills={skills} />
          <AboutSection />
          <ContactSection />
          <ContactForm />
        </Container>
      </Paper>
    </>
  )
}

export default HomePage
