import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { gql } from '@apollo/client'
import client from 'apolloClient'
import { Typography } from '@mui/material'
import { Game } from 'lib/models/Game'

const QUERY_PROJECT = gql`
  query Project($id: ID!) {
    project: Project(id: $id) {
      id
      title
      description
    }
  }
`

const QUERY_PROJECTS = gql`
  query AllProjects {
    projects: allProjects {
      id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: QUERY_PROJECTS })

  return {
    paths: data.projects.map((o) => ({ params: { id: o.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Game> = async ({ params }) => {
  const { data } = await client.query<{ project: Game }>({ query: QUERY_PROJECT, variables: { id: params.id } })

  return {
    props: {
      ...data.project,
    },
  }
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { title, description } = props
  return (
    <div>
      <h1>{title}</h1>
      <Typography>{description}</Typography>
    </div>
  )
}

export default GamePage
