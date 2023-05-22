import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ProjectContainer from 'components/project/ProjectContainer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'
import apolloClient from 'apolloClient'
import { Category, ProjectQuery } from 'generated/graphql'
import Head from 'next/head'
import Link from 'next/link'
import Error from 'next/error'
import { ProjectElement, QUERY_PROJECT, QUERY_PROJECT_PAGES } from 'components/project/project.operations'
import { getFragmentData } from 'generated'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1)
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: QUERY_PROJECT_PAGES,
  })
  const paths = data?.projects.reduce<{ params: ParsedUrlQuery; locale?: string }[]>((acc, curr) => {
    const params = {
      id: curr.slug ?? curr.id,
      category: curr.categories?.length ? curr.categories[0] : Category.Games,
    }
    return [...acc, { params, locale: 'en' }, { params, locale: 'ko' }, { params, locale: 'fr' }]
  }, [])

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<ProjectQuery> = async ({ params, locale = 'en' }) => {
  const { data } = await apolloClient.query({
    query: QUERY_PROJECT,
    variables: { where: { slug: params?.id as string } },
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      project: data.project,
      projects: data.projects.filter((o) => o.id !== params?.id),
    },
  }
}

const ProjectPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { project: projectFragment, projects } = props
  if (!projectFragment) {
    return <Error statusCode={404} />
  }
  const { description } = projectFragment
  const { title, image, blur, categories } = getFragmentData(ProjectElement, projectFragment)

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
      <Typography variant={'h3'} sx={(theme) => ({ marginTop: theme.spacing(12) })}>
        All recent work
      </Typography>
      <ProjectContainer projects={projects} />
    </Container>
  )
}

export default ProjectPage
