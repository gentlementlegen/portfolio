'use client'

import React, { JSX } from 'react'
import { Box, Grid, Paper, SxProps, Theme, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { cardVariant, container } from 'components/animations/cardsReveal'
import { FragmentType, getFragmentData } from 'generated'
import { SkillElement } from 'components/project/project.operations'
import { useTranslation } from 'components/i18n/client'
import { SkillCategory } from 'generated/graphql'

interface SkillContainerProps {
  skills: FragmentType<typeof SkillElement>[]
  lang: string
}

const styles: Record<'section' | 'header' | 'heading' | 'subtitle' | 'grid' | 'card' | 'cardTitle' | 'chipWrap' | 'chip', SxProps<Theme>> =
  {
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
    card: (theme) => ({
      height: '100%',
      padding: { xs: 3, sm: 3.5 },
      border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
      background: `linear-gradient(150deg, ${alpha(
        theme.palette.background.paper,
        theme.palette.mode === 'dark' ? 0.78 : 0.95,
      )}, ${alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.58 : 0.88)})`,
      boxShadow: `0 18px 40px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.35 : 0.16)}`,
      backdropFilter: 'blur(16px)',
    }),
    cardTitle: {
      fontWeight: 600,
      marginBottom: 2,
    },
    chipWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1.25,
    },
    chip: (theme) => ({
      display: 'inline-flex',
      alignItems: 'center',
      paddingInline: theme.spacing(1.7),
      paddingBlock: theme.spacing(0.6),
      borderRadius: 999,
      fontSize: '0.95rem',
      fontWeight: 500,
      color: theme.palette.text.primary,
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.24 : 0.18)}`,
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.08 : 0.06),
    }),
  }

const categoryOrder: SkillCategory[] = [
  SkillCategory.Frontend,
  SkillCategory.Backend,
  SkillCategory.Web3,
  SkillCategory.ToolsAndDevops,
]

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const { skills: skillsFragment, lang } = props
  const skills = getFragmentData(SkillElement, skillsFragment)
  const { t } = useTranslation(lang, 'common')

  const categoryLabels: Record<SkillCategory, string> = {
    [SkillCategory.Frontend]: t('skills category frontend'),
    [SkillCategory.Backend]: t('skills category backend'),
    [SkillCategory.Web3]: t('skills category web3'),
    [SkillCategory.ToolsAndDevops]: t('skills category tools'),
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const key = skill.category
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(skill)
      return acc
    },
    {} as Record<SkillCategory, typeof skills>,
  )

  const sections = categoryOrder
    .map((category) => ({
      category,
      title: categoryLabels[category],
      skills: (groupedSkills[category] ?? []).slice().sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((section) => section.skills.length > 0)

  return (
    <Box id={'skills'} sx={styles.section}>
      <Box sx={styles.header}>
        <Typography variant={'h2'} align={'center'} sx={styles.heading}>
          {t('skills heading')}
        </Typography>
        <Typography variant={'body1'} align={'center'} sx={styles.subtitle}>
          {t('skills subtitle')}
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={styles.grid}
      >
        {sections.map((section) => (
          <Grid key={section.category} size={{ xs: 12, md: 6 }} component={motion.div} variants={cardVariant}>
            <Paper variant={'outlined'} sx={styles.card}>
              <Typography variant={'h5'} sx={styles.cardTitle}>
                {section.title}
              </Typography>
              <Box sx={styles.chipWrap}>
                {section.skills.map((skill) => (
                  <Box key={skill.id} component={'span'} sx={styles.chip}>
                    {skill.name}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SkillContainer
