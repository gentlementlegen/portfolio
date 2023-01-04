import { graphql } from 'generated'

export const QUERY_PROJECT = graphql(/* GraphQL */ `
  query Project($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      id
      ...projectElement
      description {
        html
        text
      }
    }
    projects(first: 100) {
      id
      ...projectElement
    }
  }
`)

export const ProjectElement = graphql(/* GraphQL */ `
  fragment projectElement on Project {
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
`)

export const QUERY_PROJECT_PAGES = graphql(/* GraphQL */ `
  query ProjectPages($first: Int) {
    projects(first: $first) {
      id
      slug
      categories
    }
  }
`)

export const QUERY_PROJECTS = graphql(/* GraphQL */ `
  query Projects($where: ProjectWhereInput!) {
    projects(where: $where, first: 100) {
      id
      ...projectElement
    }
  }
`)

export const SkillElement = graphql(/* GraphQL */ `
  fragment skillElement on Skill {
    id
    name
    image {
      id
      url
    }
    blur
  }
`)
