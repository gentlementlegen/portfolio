import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from 'generated/graphql'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { project } = props
  return (
    <Card variant={'outlined'}>
      <Link href={`/projects/${project.slug}`} passHref>
        <CardActionArea>
          {project.image && (
            <CardMedia style={{ minHeight: 0, position: 'relative', height: 150, width: '100%' }}>
              <Image
                src={project.image.url}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                placeholder={'blur'}
                blurDataURL={project.image.url}
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
