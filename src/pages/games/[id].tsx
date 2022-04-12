import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { Game } from 'lib/models/Game'
import { resolvers } from 'pages/api/graphql'
import dbConnect from 'lib/dbConnect'
import Image from 'next/image'

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect()
  const projects = await resolvers.Query.allProjects()
  return {
    paths: projects.map((o) => ({ params: { id: o.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Game> = async ({ params }) => {
  await dbConnect()
  const project: Game = await resolvers.Query.Project(undefined, { id: params.id as string })

  return {
    props: {
      category: project.category,
      description: project.description,
      id: project.id,
      title: project.title,
      image: `/api/image/${project.image}`,
    },
  }
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { title, description, image } = props
  return (
    <Container
      sx={{
        minHeight: `calc(100vh - 118px)`,
      }}
    >
      {image && <Image src={image} width={800} height={600} alt={title} />}
      <Typography component={'h1'} variant={'h2'} align={'center'}>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Container>
  )
}

export default GamePage
