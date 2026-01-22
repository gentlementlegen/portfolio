'use client'

import { Box, BoxProps, Grid, SxProps, Theme, Typography } from '@mui/material'
import { cardVariant, container } from 'components/animations/cardsReveal'
import { useTranslation } from 'components/i18n/client'
import { ProjectElement } from 'components/project/project.operations'
import ProjectCard from 'components/project/ProjectCard'
import { motion } from 'framer-motion'
import { FragmentType, getFragmentData } from 'generated'
import { Category } from 'generated/graphql'
import React, { JSX } from 'react'

interface ProjectContainerProps extends BoxProps {
  projects: FragmentType<typeof ProjectElement>[]
  lang?: string
  showHeader?: boolean
}

const styles = {
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
  toggleWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: { xs: 2, md: 3 },
    marginBottom: { xs: 1.5, md: 2 },
  },
  toggleGroup: (theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    gap: theme.spacing(0.5),
    borderRadius: 999,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.action.selected,
  }),
  toggleButton: (theme) => ({
    position: 'relative',
    border: 0,
    background: 'transparent',
    padding: theme.spacing(0.75, 2),
    borderRadius: 999,
    cursor: 'pointer',
    font: 'inherit',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    transition: 'color 200ms ease',
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
    },
  }),
  toggleButtonActive: (theme) => ({
    color: theme.palette.primary.contrastText,
  }),
  toggleIndicator: (theme) => ({
    position: 'absolute',
    inset: 2,
    borderRadius: 999,
    backgroundColor: theme.palette.primary.main,
    zIndex: 0,
  }),
  toggleLabel: {
    position: 'relative',
    zIndex: 1,
    whiteSpace: 'nowrap',
  },
} satisfies Record<
  | 'section'
  | 'header'
  | 'heading'
  | 'subtitle'
  | 'grid'
  | 'toggleWrap'
  | 'toggleGroup'
  | 'toggleButton'
  | 'toggleButtonActive'
  | 'toggleIndicator'
  | 'toggleLabel',
  SxProps<Theme>
>

const ProjectContainer = (props: ProjectContainerProps): JSX.Element => {
  const { projects: projectsFragment, sx, lang = 'en', showHeader = true, ...rest } = props
  const { t } = useTranslation(lang, 'common')
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(Category.Projects)

  const categoryLabels: Record<Category, string> = {
    [Category.Projects]: t('projects category projects'),
    [Category.Games]: t('projects category games'),
    [Category.Others]: t('projects category others'),
  }

  const projects = React.useMemo(() => {
    const data = getFragmentData(ProjectElement, projectsFragment)
    return data.slice().sort((a, b) => {
      const aSelected = a.categories.includes(selectedCategory)
      const bSelected = b.categories.includes(selectedCategory)
      if (aSelected !== bSelected) {
        return Number(bSelected) - Number(aSelected)
      }
      return b.id.localeCompare(a.id)
    })
  }, [projectsFragment, selectedCategory])

  console.log('Filtered Projects:', projects.length, selectedCategory)

  const categoryOrder = [Category.Projects, Category.Games, Category.Others]

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
      <Box sx={styles.toggleWrap}>
        <Box sx={styles.toggleGroup} role={'group'} aria-label={t('projects categories')}>
          {categoryOrder.map((category) => {
            const isActive = selectedCategory === category
            return (
              <Box
                key={category}
                component={'button'}
                type={'button'}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isActive}
                sx={[styles.toggleButton, ...(isActive ? [styles.toggleButtonActive] : [])]}
              >
                {isActive && (
                  <Box
                    component={motion.span}
                    layoutId={'projects-category-indicator'}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    sx={styles.toggleIndicator}
                  />
                )}
                <Box component={'span'} sx={styles.toggleLabel}>
                  {categoryLabels[category]}
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
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
