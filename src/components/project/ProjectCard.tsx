import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { Game } from 'lib/models/Game'

interface ProjectCardProps {
  project: Game
}

const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { project } = props
  return (
    <Card variant={'outlined'}>
      <Link href={`/games/${project.id}`} passHref>
        <CardActionArea>
          <CardMedia component={'img'} height={140} image={'/vercel.svg'} alt={'vercel'} />
          <CardContent>
            <Typography>{project.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default ProjectCard
