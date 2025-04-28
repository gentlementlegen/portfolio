import React, { JSX } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, CardProps, Typography } from '@mui/material'
import Image from 'next/image'
import { ProjectElementFragment } from 'generated/graphql'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ProjectCardProps extends CardProps {
  project: ProjectElementFragment
  onActionAreaClick?: (id: ProjectElementFragment) => void
}

const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { project, onActionAreaClick = () => {}, sx, ...rest } = props

  const handleCardActionAreaClick = () => {
    onActionAreaClick(project)
  }

  return (
    <Card
      variant={'outlined'}
      sx={[{ height: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}
      component={motion.div}
      layout
      whileHover={{ scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 800, damping: 5 }}
      {...rest}
    >
      <Link
        href={`/${!!project.categories?.length ? project.categories[0].toLowerCase() : 'others'}/${project.slug}`}
        passHref
      >
        <CardActionArea onClick={handleCardActionAreaClick}>
          {project.image && (
            <CardMedia sx={{ minHeight: 0, position: 'relative', height: 150, width: '100%' }}>
              <Image
                src={project.image.url}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                placeholder={'blur'}
                blurDataURL={project.blur ?? ''}
                sizes={'(max-width: 768px) 100vw,(max-width: 1200px) 25vw'}
              />
            </CardMedia>
          )}
          <CardContent>
            <Typography>{project.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default ProjectCard
