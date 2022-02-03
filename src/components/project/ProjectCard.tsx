import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

interface ProjectCardProps {
  title: string
}

const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { title } = props
  return (
    <Card variant={'outlined'}>
      <CardActionArea>
        <CardMedia component={'img'} height={140} image={'/vercel.svg'} />
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard
