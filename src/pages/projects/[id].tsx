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
import { Project, QueryProjectArgs } from 'generated/graphql'

const QUERY_PROJECT = gql`
  query Project($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      id
      title
      slug
      description {
        html
      }
      image {
        id
        url
      }
    }
    projects {
      id
      title
      slug
      image {
        id
        url
      }
    }
  }
`

const QUERY_PROJECTS = gql`
  query Projects {
    projects {
      id
      slug
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<{ projects: Project[] }>({ query: QUERY_PROJECTS })
  const paths = data?.projects.reduce<{ params: ParsedUrlQuery; locale?: string }[]>((acc, curr) => {
    const params = { id: curr.slug ?? curr.id }
    return [...acc, { params, locale: 'en' }, { params, locale: 'ko' }, { params, locale: 'fr' }]
  }, [])

  return {
    paths,
    fallback: false,
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
          <Image src={image.url} width={400} height={300} alt={title} placeholder={'blur'} blurDataURL={image.url} />
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

export default GamePage
