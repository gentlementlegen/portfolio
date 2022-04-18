import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { Game } from 'lib/models/Game'
import { resolvers } from 'pages/api/graphql'
import dbConnect from 'lib/dbConnect'
import Image from 'next/image'
import { Box } from '@mui/system'
import ProjectContainer from 'components/project/ProjectContainer'

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect()
  const projects = await resolvers.Query.allProjects()
  return {
    paths: projects.map((o) => ({ params: { id: o.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ project: Game; projects: Game[] }> = async ({ params }) => {
  await dbConnect()
  const project: Game = await resolvers.Query.Project(undefined, { id: params.id as string })
  const projects: Game[] = await resolvers.Query.allProjects()

  return {
    props: {
      project: {
        category: project.category,
        description: project.description,
        id: project.id,
        title: project.title,
        image: `/api/image/${project.image}`,
      },
      projects: projects.map((o) => {
        return {
          category: o.category,
          description: o.description,
          id: o.id,
          title: o.title,
          image: `/api/image/${o.image}`,
        }
      }),
    },
  }
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const {
    project: { title, description, image },
    projects,
  } = props
  return (
    <Container
      sx={(theme) => ({
        minHeight: `calc(100vh - 118px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
      })}
    >
      <Typography component={'h1'} variant={'h2'} align={'center'} gutterBottom>
        {title}
      </Typography>
      {image && (
        <Box
          sx={(theme) => ({
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4),
            '& > span': {
              borderRadius: 2,
            },
          })}
        >
          <Image src={image} width={400} height={300} alt={title} />
        </Box>
      )}
      <Typography>{description}</Typography>
      <Typography variant={'h3'} sx={(theme) => ({ marginTop: theme.spacing(12) })}>
        All recent work
      </Typography>
      <ProjectContainer projects={projects} />
    </Container>
  )
}

export default GamePage
