import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ProjectContainer from 'components/project/ProjectContainer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'
import { gql } from '@apollo/client'
import apolloClient from 'apolloClient'
import { Project, QueryProjectArgs, QueryProjectsArgs } from 'generated/graphql'
import Head from 'next/head'
import Link from 'next/link'

const QUERY_PROJECT = gql`
  query Project($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      ...project
      description {
        html
        text
      }
    }
    projects(first: 100) {
      ...project
    }
  }
  fragment project on Project {
    id
    title
    slug
    categories
    blur
    image {
      id
      url
    }
  }
`

const QUERY_PROJECTS = gql`
  query Projects($first: Int) {
    projects(first: $first) {
      id
      slug
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<{ projects: Project[] }, QueryProjectsArgs>({
    query: QUERY_PROJECTS,
    variables: {
      first: 1,
    },
  })
  const paths = data?.projects.reduce<{ params: ParsedUrlQuery; locale?: string }[]>((acc, curr) => {
    const params = { id: curr.slug ?? curr.id, category: curr.categories?.length ? curr.categories[0] : 'others' }
    return [...acc, { params, locale: 'en' }, { params, locale: 'ko' }, { params, locale: 'fr' }]
  }, [])

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ project: Project; projects: Project[] }> = async ({ params, locale }) => {
  const { data } = await apolloClient.query<{ projects: Project[]; project: Project }, QueryProjectArgs>({
    query: QUERY_PROJECT,
    variables: { where: { slug: params.id as string } },
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      project: data.project,
      projects: data.projects.filter((o) => o.id !== params.id),
    },
  }
}

const ProjectPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const {
    project: { title, description, image, blur, categories },
    projects,
  } = props

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
      <Head>
        <title key={'title'}>{title}</title>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta key={'description'} name="description" content={description.text} />
        <meta property={'og:description'} content={description.text} key="ogdescription" />
      </Head>
      <Stack direction={'row'} spacing={1} sx={{ mb: 2 }}>
        {categories?.map((category) => (
          <Link key={category} href={`/${category.toLocaleLowerCase()}`} passHref>
            <Chip label={category} color={'link'} component="a" clickable />
          </Link>
        ))}
      </Stack>
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
          <Image
            src={image.url}
            width={400}
            height={300}
            alt={title}
            placeholder={'blur'}
            blurDataURL={blur}
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
      <Typography variant={'h3'} sx={(theme) => ({ marginTop: theme.spacing(12) })}>
        All recent work
      </Typography>
      <ProjectContainer projects={projects} />
    </Container>
  )
}

export default ProjectPage
