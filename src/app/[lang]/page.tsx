import { Box, Container, Grid, Paper, SxProps, Theme } from '@mui/material'
import Background from 'components/home/Background'
import DownArrow from 'components/home/DownArrow'
import HomeSections from 'components/home/HomeSections'
import WelcomeMessage from 'components/home/WelcomeMessage'
import { getHomeContentData, getHomeCriticalData } from 'lib/homeData'

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

async function HomePage({ params }: HomePageProps) {
  const [{ cvUrl }, { projects, skills }] = await Promise.all([getHomeCriticalData(), getHomeContentData()])
  const { lang } = await params

  return (
    <>
      <Background />
      <Box id={'home'} sx={style.hero}>
        <Container maxWidth={'md'}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
          <HomeSections lang={lang} projects={projects} skills={skills} />
        </Container>
      </Paper>
    </>
  )
}

export default HomePage
