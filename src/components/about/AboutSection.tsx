'use client'

import React from 'react'
import { Box, Grid, Paper, SxProps, Theme, Typography } from '@mui/material'
import { CodeRounded, GridViewRounded, RocketLaunchRounded } from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'components/i18n/client'
import { motion } from 'framer-motion'
import { cardVariant, container } from 'components/animations/cardsReveal'

export interface AboutSectionProps {
  lang: string
}

const styles: Record<
  'section' | 'content' | 'header' | 'heading' | 'subtitle' | 'cards' | 'card' | 'icon' | 'cardTitle' | 'cardBody',
  SxProps<Theme>
> = {
  section: {
    position: 'relative',
    padding: { xs: 4, sm: 5, md: 7 },
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: { xs: 3, md: 5 },
  },
  heading: {
    color: 'inherit',
    marginBottom: { xs: 1.5, md: 2 },
  },
  subtitle: (theme) => ({
    maxWidth: 720,
    margin: '0 auto',
    color: theme.palette.text.secondary,
  }),
  cards: {
    marginTop: { xs: 3, md: 4 },
  },
  card: (theme) => ({
    height: '100%',
    padding: { xs: 3, md: 3.5 },
    backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.72 : 0.9),
    border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
    boxShadow: `0 18px 40px ${alpha(theme.palette.common.black, 0.2)}`,
    backdropFilter: 'blur(12px)',
  }),
  icon: (theme) => ({
    width: 56,
    height: 56,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.text.primary, 0.08),
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2.5),
  }),
  cardTitle: {
    color: 'text.primary',
    fontWeight: 600,
    marginBottom: 1,
  },
  cardBody: (theme) => ({
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  }),
}

const AboutSection = ({ lang }: AboutSectionProps) => {
  const { t } = useTranslation(lang, 'common')

  const cards = [
    {
      title: t('about card 1 title'),
      description: t('about card 1 body'),
      icon: CodeRounded,
    },
    {
      title: t('about card 2 title'),
      description: t('about card 2 body'),
      icon: GridViewRounded,
    },
    {
      title: t('about card 3 title'),
      description: t('about card 3 body'),
      icon: RocketLaunchRounded,
    },
  ]

  return (
    <Box id={'about'} sx={styles.section}>
      <Box sx={styles.content}>
        <Box sx={styles.header}>
          <Typography variant={'h2'} align={'center'} sx={styles.heading}>
            {t('about title')}
          </Typography>
          <Typography variant={'body1'} align={'center'} sx={styles.subtitle}>
            {t('about lead')}
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
          sx={styles.cards}
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Grid key={card.title} size={{ xs: 12, md: 4 }} component={motion.div} variants={cardVariant}>
                <Paper variant={'outlined'} sx={styles.card}>
                  <Box sx={styles.icon}>
                    <Icon fontSize={'medium'} />
                  </Box>
                  <Typography variant={'h5'} sx={styles.cardTitle}>
                    {card.title}
                  </Typography>
                  <Typography variant={'body2'} sx={styles.cardBody}>
                    {card.description}
                  </Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default AboutSection
