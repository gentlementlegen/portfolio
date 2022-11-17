import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Skill } from 'generated/graphql'

interface SkillContainerProps {
  skills: Skill[]
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const { skills } = props
  const { t } = useTranslation('common')

  return (
    <Box>
      <Typography variant={'h2'} align={'center'} gutterBottom>
        {t('skills')}
      </Typography>
      <Grid container spacing={2} justifyContent={'center'}>
        {skills.map((o) => (
          <Grid key={o.id} item xs={6} sm={4} md={2}>
            <Stack position={'relative'} alignItems={'center'}>
              <div>
                {o.image && (
                  <Image
                    src={o.image.url}
                    alt={o.name}
                    width={70}
                    height={50}
                    objectFit={'contain'}
                    placeholder={'blur'}
                    blurDataURL={o.image.url}
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
