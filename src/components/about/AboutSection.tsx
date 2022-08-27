import React from 'react'
import { Container, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

const Span = styled('span')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'block',
}))

const AboutSection = (): JSX.Element => {
  const { t } = useTranslation('common')

  return (
    <Container maxWidth={'md'} id={'about'}>
      <Typography variant={'h2'} align={'center'}>
        {t('about')}
      </Typography>
      <Typography>
        <Span>{t('desc part 1')}</Span>
        <Span>{t('desc part 2')}</Span>
        <Span>{t('desc part 3')}</Span>
      </Typography>
    </Container>
  )
}

export default AboutSection
