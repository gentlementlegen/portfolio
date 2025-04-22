'use client'

import React from 'react'
import { Container, styled, Typography } from '@mui/material'
import { useTranslation } from 'components/i18n/client'
import { motion } from 'framer-motion'
import { cardVariant } from 'components/animations/cardsReveal'

const Span = styled('span')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'block',
}))

export interface AboutSectionProps {
  lang: string
}

const AboutSection = ({ lang }: AboutSectionProps) => {
  const { t } = useTranslation(lang, 'common')

  return (
    <Container maxWidth={'md'} id={'about'}>
      <Typography variant={'h2'} align={'center'}>
        {t('about')}
      </Typography>
      <Typography
        component={motion.div}
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Span>{t('desc part 1')}</Span>
        <Span>{t('desc part 2')}</Span>
        <Span>{t('desc part 3')}</Span>
      </Typography>
    </Container>
  )
}

export default AboutSection
