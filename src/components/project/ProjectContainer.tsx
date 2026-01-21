'use client'

import React, { JSX } from 'react'
import { Box, BoxProps, Grid, SxProps, Theme, Typography } from '@mui/material'
import ProjectCard from 'components/project/ProjectCard'
import { motion } from 'framer-motion'
import { cardVariant, container } from 'components/animations/cardsReveal'
import { FragmentType, getFragmentData } from 'generated'
import { ProjectElement } from 'components/project/project.operations'
import { useTranslation } from 'components/i18n/client'

interface ProjectContainerProps extends BoxProps {
  projects: FragmentType<typeof ProjectElement>[]
  lang?: string
  showHeader?: boolean
}

const styles: Record<'section' | 'header' | 'heading' | 'subtitle' | 'grid', SxProps<Theme>> = {
  section: {
    position: 'relative',
    padding: { xs: 4, sm: 5, md: 7 },
  },
  header: {
    textAlign: 'center',
    marginBottom: { xs: 3, md: 5 },
  },
  heading: {
    marginBottom: { xs: 1, md: 1.5 },
  },
  subtitle: (theme) => ({
    maxWidth: 720,
    margin: '0 auto',
    color: theme.palette.text.secondary,
  }),
  grid: {
    marginTop: { xs: 2, md: 3 },
  },
}

const ProjectContainer = (props: ProjectContainerProps): JSX.Element => {
  const { projects: projectsFragment, sx, lang = 'en', showHeader = true, ...rest } = props
  const projects = getFragmentData(ProjectElement, projectsFragment)
  const { t } = useTranslation(lang, 'common')

  return (
    <Box
      sx={[
        {
          width: '100%',
        },
        styles.section,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      id={'projects'}
      {...rest}
    >
      {showHeader && (
        <Box sx={styles.header}>
          <Typography variant={'h2'} align={'center'} sx={styles.heading}>
            {t('projects heading')}
          </Typography>
          <Typography variant={'body1'} align={'center'} sx={styles.subtitle}>
            {t('projects subtitle')}
          </Typography>
        </Box>
      )}
      <Grid
        component={motion.div}
        container
        justifyContent={'center'}
        spacing={{ xs: 2.5, md: 3 }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={styles.grid}
      >
        {projects?.map((project) => (
          <Grid component={motion.div} size={{ xs: 12, sm: 6, md: 4 }} key={project.id} layout variants={cardVariant}>
            <ProjectCard
              project={project}
              labels={{
                liveDemo: t('projects live demo'),
                code: t('projects code'),
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProjectContainer
