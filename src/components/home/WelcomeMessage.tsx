'use client'

import React from 'react'
import { useTranslation } from 'components/i18n/client'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import { Trans } from 'next-i18next'

interface WelcomeMessageProps {
  lang: string
}

export default function WelcomeMessage({ lang }: WelcomeMessageProps) {
  const { t } = useTranslation(lang, 'common')

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Typography variant={'h1'} component={'h2'} align={'center'} gutterBottom color={'#ffffff'}>
          {t('h1')}
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}
      >
        <Typography variant={'h5'} component={'h1'} align={'center'} color={'#ffffff'}>
          <Trans i18nKey={'h2'} ns="common">
            I am <em style={{ color: 'rgb(178, 178, 178)' }}>Fernand</em>, a dev lead in South Korea. Passionate about
            video-games, I currently work with React.js, Node.js, Typescript & GraphQl.
          </Trans>
        </Typography>
      </motion.div>
    </>
  )
}
