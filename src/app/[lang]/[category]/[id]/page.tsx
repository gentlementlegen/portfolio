import React from 'react'
import apolloClient from 'apolloClient'
import { ProjectElement, QUERY_PROJECT } from 'components/project/project.operations'
import { getFragmentData } from 'generated'
import { redirect } from 'next/navigation'
import { Box, Container, Typography } from '@mui/material'
import ProjectContainer from 'components/project/ProjectContainer'
import Image from 'next/image'
import { Metadata } from 'next'
import ProjectCategoryChips from 'components/project/ProjectCategoryChips'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const { data } = await apolloClient.query({
    query: QUERY_PROJECT,
    variables: { where: { slug: id } },
  })
  const project = data?.project

  if (!project) return {}
  const { description } = project
  const { title, image, blur, categories } = getFragmentData(ProjectElement, project)

  return {
    title,
    description: description.text,
    openGraph: {
      title,
      description: description.text,
      images: image.url,
    },
  }
}

async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data } = await apolloClient.query({
    query: QUERY_PROJECT,
    variables: { where: { slug: id } },
  })
  const project = data?.project
  const projects = data?.projects?.filter((o) => o.id !== id) ?? []
  if (!project) {
    return redirect('/')
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
      <ProjectCategoryChips categories={categories ?? []} />
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
