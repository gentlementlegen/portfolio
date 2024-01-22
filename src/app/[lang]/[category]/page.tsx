import React from 'react'
import apolloClient from 'apolloClient'
import { QUERY_PROJECTS } from 'components/project/project.operations'
import { Category } from 'generated/graphql'
import { Box, Container, Typography } from '@mui/material'
import ProjectContainer from 'components/project/ProjectContainer'

async function CategoryPage({ params }: { params: { category: string; id: string } }) {
  const { data } = await apolloClient.query({
    query: QUERY_PROJECTS,
    variables: {
      where: {
        categories_contains_some: (!params?.category
          ? [Category.Projects, Category.Games, Category.Others]
          : Array.isArray(params?.category)
            ? params?.category
            : [params?.category]) as Category[],
      },
    },
  })
  const projects = data.projects.filter((o) => o.id !== params?.id)
  const title = !params?.category ? '' : Array.isArray(params.category) ? params.category[0] : params.category
  return (
    <>
      <Container maxWidth={'lg'} sx={{ py: { xs: 4, sm: 10 } }}>
        <Typography variant={'h2'} component={'h1'} align={'center'}>
          All my{' '}
          <Box component={'span'} sx={{ color: 'link.main' }}>
            {title}
          </Box>
        </Typography>
        <ProjectContainer projects={projects} sx={{ pt: { xs: 0, sm: 8 } }} />
      </Container>
    </>
  )
}

export default CategoryPage
