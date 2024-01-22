import React from 'react'
import apolloClient from 'apolloClient'
import { ProjectElement, QUERY_PROJECT } from 'components/project/project.operations'
import { getFragmentData } from 'generated'
import { notFound } from 'next/navigation'
import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import ProjectContainer from 'components/project/ProjectContainer'
import Image from 'next/image'
import { Metadata } from 'next'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1)
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data } = await apolloClient.query({
    query: QUERY_PROJECT,
    variables: { where: { slug: params.id } },
  })
  const project = data.project

  if (!project) return {}
  const { description } = project
  const { title, image, blur, categories } = getFragmentData(ProjectElement, project)

  return {
    title,
    description: description.text,
    openGraph: {
      title,
      description: description.text,
    },
  }
}

async function ProjectPage({ params }: { params: { id: string } }) {
  const { data } = await apolloClient.query({
    query: QUERY_PROJECT,
    variables: { where: { slug: params.id } },
  })
  const project = data.project
  const projects = data.projects.filter((o) => o.id !== params?.id)
  if (!project) {
    return notFound()
  }
  const { description } = project
  const { title, image, blur, categories } = getFragmentData(ProjectElement, project)
  return (
    <Container
      sx={{
        minHeight: `calc(100vh - 118px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: { xs: 4, sm: 10 },
      }}
    >
      <Stack direction={'row'} spacing={1} sx={{ mb: 2 }}>
        {categories?.map((category) => (
          <Chip
            label={capitalizeFirstLetter(category)}
            color={'link'}
            component={Link}
            clickable
            key={category}
            href={`/${category.toLocaleLowerCase()}`}
            passHref
          />
        ))}
      </Stack>
      <Typography component={'h1'} variant={'h2'} align={'center'} gutterBottom>
        {title}
      </Typography>
      {image && (
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 4,
            '& > span': {
              borderRadius: 2,
            },
          }}
        >
          <Image
            src={image.url}
            width={400}
            height={300}
            alt={title}
            placeholder={'blur'}
            blurDataURL={blur ?? ''}
            style={{
              maxWidth: '100%',
            }}
          />
        </Box>
      )}
      <Box
        sx={{ '& a': { color: 'link.main', textDecoration: 'underline' } }}
        dangerouslySetInnerHTML={{ __html: description.html }}
      />
      <Typography variant={'h3'} sx={{ marginTop: 12 }}>
        All recent work
      </Typography>
      <ProjectContainer projects={projects} />
    </Container>
  )
}

export default ProjectPage
