'use client'

import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cardVariant, container } from 'components/animations/cardsReveal'
import { FragmentType, getFragmentData } from 'generated'
import { SkillElement } from 'components/project/project.operations'
import { useTranslation } from 'components/i18n/client'

interface SkillContainerProps {
  skills: FragmentType<typeof SkillElement>[]
  lang: string
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const { skills: skillsFragment, lang } = props
  const skills = getFragmentData(SkillElement, skillsFragment)
  const { t } = useTranslation(lang, 'common')

  return (
    <Box>
      <Typography variant={'h2'} align={'center'} gutterBottom>
        {t('skills')}
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((o) => (
          <Grid key={o.id} item xs={6} sm={4} md={2} component={motion.div} layout variants={cardVariant}>
            <Stack position={'relative'} alignItems={'center'}>
              <div>
                {o.image && (
                  <Image
                    src={o.image.url}
                    alt={o.name}
                    width={70}
                    height={50}
                    style={{ objectFit: 'contain' }}
                    placeholder={'blur'}
                    blurDataURL={o.blur ?? ''}
                  />
                )}
              </div>
              <Typography>{o.name}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SkillContainer
