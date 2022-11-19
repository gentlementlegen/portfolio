import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import Image from 'next/image'
import { Box } from '@mui/system'
import ProjectContainer from 'components/project/ProjectContainer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'
import { gql } from '@apollo/client'
import apolloClient from 'apolloClient'
import { Project, QueryProjectArgs, QueryProjectsArgs } from 'generated/graphql'
import Head from 'next/head'

const QUERY_PROJECT = gql`
  query Project($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      id
      title
      slug
      description {
        html
        text
      }
      blur
      image {
        id
        url
      }
    }
    projects(first: 100) {
      id
      title
      slug
      image {
        id
        url
      }
      blur
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
    const params = { id: curr.slug ?? curr.id }
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description.text} />
      </Head>
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
          <Image src={image.url} width={400} height={300} alt={title} placeholder={'blur'} blurDataURL={blur} />
        </Box>
      )}
      <Box dangerouslySetInnerHTML={{ __html: description.html }} />
      <Typography variant={'h3'} sx={(theme) => ({ marginTop: theme.spacing(12) })}>
        All recent work
      </Typography>
      <ProjectContainer projects={projects} />
    </Container>
  )
}

export default ProjectPage
