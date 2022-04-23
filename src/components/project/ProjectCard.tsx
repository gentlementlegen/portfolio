import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { Game } from 'lib/models/Game'
import Image from 'next/image'

interface ProjectCardProps {
  project: Game
}

const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { project } = props
  return (
    <Card variant={'outlined'}>
      <Link href={`/games/${project.id}`} passHref>
        <CardActionArea>
          {project.image && (
            <CardMedia style={{ minHeight: 0, position: 'relative', height: 150, width: '100%' }}>
              <Image
                src={project.image}
                alt={project.title}
                layout={'fill'}
                objectFit={'cover'}
                placeholder={'blur'}
                blurDataURL={project.blur}
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
