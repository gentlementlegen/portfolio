import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { getProjectObject, Project } from 'lib/models/Project'
import dbConnect from 'lib/dbConnect'
import Image from 'next/image'
import { Box } from '@mui/system'
import ProjectContainer from 'components/project/ProjectContainer'
import resolvers from 'lib/schema/resolvers'

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect()
  const projects = await resolvers.Query.allProjects()
  return {
    paths: projects.map((o) => ({ params: { id: o.slug ?? o.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ project: Project; projects: Project[] }> = async ({ params }) => {
  await dbConnect()
  const project: Project = await resolvers.Query.ProjectBySlug(undefined, { slug: params.id as string })
  const projects: Project[] = await resolvers.Query.allProjects()

  return {
    props: {
      project: getProjectObject(project),
      projects: projects.filter((o) => o.id !== project.id).map((o) => getProjectObject(o)),
    },
  }
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const {
    project: { title, description, image, blur },
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
          <Image src={image} width={400} height={300} alt={title} placeholder={'blur'} blurDataURL={blur} />
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
