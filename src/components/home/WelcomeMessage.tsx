'use client'

import React from 'react'
import { useTranslation } from 'components/i18n/client'
import { motion } from 'framer-motion'
import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { Trans } from 'next-i18next'
import { CodeRounded, DownloadRounded, MailOutline, GitHub, LinkedIn } from '@mui/icons-material'

interface WelcomeMessageProps {
  lang: string
}

export default function WelcomeMessage({ lang }: WelcomeMessageProps) {
  const { t } = useTranslation(lang, 'common')

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Paper
        variant={'outlined'}
        sx={{
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 6 },
          textAlign: 'center',
          borderRadius: { xs: 4, sm: 6 },
          maxWidth: 860,
          margin: '0 auto',
          boxShadow: '0 24px 60px rgba(2, 6, 23, 0.45)',
        }}
      >
        <Stack spacing={3} alignItems={'center'}>
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CodeRounded color={'primary'} />
            </Box>
          </Box>
          <Box>
            <Typography variant={'h2'} component={'h1'} gutterBottom>
              {t('h1')}
            </Typography>
            <Typography variant={'subtitle1'} color={'text.secondary'}>
              <Trans i18nKey={'h2'} ns="common">
                I am <em>Fernand</em>, a dev lead in South Korea. Passionate about video-games, I currently work with
                React.js, Node.js, Typescript & GraphQl.
              </Trans>
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant={'contained'}
              startIcon={<DownloadRounded />}
              component={'a'}
              href={'/fernand-veyrier-cv.pdf'}
              download
            >
              {t('download cv')}
            </Button>
            <Button variant={'outlined'} startIcon={<MailOutline />} component={'a'} href={'#contact'}>
              {t('get in touch')}
            </Button>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <IconButton component={'a'} href={'https://github.com/gentlementlegen'} target={'_blank'} rel={'noreferrer'}>
              <GitHub fontSize={'small'} />
            </IconButton>
            <IconButton
              component={'a'}
              href={'https://www.linkedin.com/in/fernand-veyrier/'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <LinkedIn fontSize={'small'} />
            </IconButton>
            <IconButton component={'a'} href={'#contact'}>
              <MailOutline fontSize={'small'} />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </motion.div>
  )
}
