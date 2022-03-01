import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { Game } from 'lib/models/Game'
import { resolvers } from 'pages/api/graphql'
import dbConnect from 'lib/dbConnect'

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
  const project = await resolvers.Query.Project(undefined, { id: params.id as string })

  return {
    props: {
      category: project.category,
      description: project.description,
      id: project.id,
      title: project.title,
    },
  }
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { title, description } = props
  return (
    <Container
      sx={{
        minHeight: `calc(100vh - 118px)`,
      }}
    >
      <Typography component={'h1'} variant={'h2'} align={'center'}>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Container>
  )
}

export default GamePage
