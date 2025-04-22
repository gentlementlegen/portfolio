import { MetadataRoute } from 'next'
import { graphql } from 'generated'
import { Category } from 'generated/graphql'
import apolloClient from 'apolloClient'

const QUERY_PROJECTS = graphql(/* GraphQL */ `
  query ProjectsId {
    projects(first: 100) {
      id
      slug
      categories
    }
  }
`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await apolloClient.query({
    query: QUERY_PROJECTS,
  })
  const siteUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : 'https://www.fernand-veyrier.xyz'
  const categoriesUrl = Object.values(Category).map((key) => ({
    url: `${siteUrl}/${key}`,
    lastModified: new Date(),
  }))
  const projectsUrl = data.projects.map((project) => ({
    url: `${siteUrl}/${project.categories[0]}/${project.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...categoriesUrl,
    ...projectsUrl,
  ]
}
