import React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { gql } from '@apollo/client'
import client from 'apolloClient'

const QUERY_PROJECT = gql`
  query Project($id: ID!) {
    project: Project(id: $id) {
      id
      title
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
    paths: data.projects.map((o) => ({ params: o.id })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({ query: QUERY_PROJECT, variables: { id: params.id } })

  return {
    props: {
      ...data,
    },
  }
}

const GamePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  console.log(props)
  return <div>This is a game</div>
}

export default GamePage
