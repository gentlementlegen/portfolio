import 'server-only'

import { ProjectElementFragment, SkillElementFragment } from 'generated/graphql'

type GraphQlResponse<TData> = {
  data?: TData
  errors?: Array<{ message?: string }>
}

type HomeCriticalQueryData = {
  cvs: Array<{
    document?: {
      url?: string | null
    } | null
  }>
}

type HomeContentQueryData = {
  projects: ProjectElementFragment[]
  skills: SkillElementFragment[]
}

const HOME_CRITICAL_QUERY = /* GraphQL */ `
  query HomeCriticalData {
    cvs(first: 1, orderBy: createdAt_DESC) {
      document {
        url
      }
    }
  }
`

const HOME_CONTENT_QUERY = /* GraphQL */ `
  query HomeContentData {
    projects(first: 100, orderBy: createdAt_DESC) {
      id
      title
      categories
      blur
      projectUrl
      projectCodeUrl
      description {
        text
      }
      skills {
        id
        name
      }
      image {
        id
        url
      }
    }
    skills(first: 100) {
      id
      name
      category
    }
  }
`

async function requestGraphql<TData>(query: string): Promise<TData> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  if (!backendUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not configured')
  }

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`)
  }

  const payload = (await response.json()) as GraphQlResponse<TData>

  if (payload.errors?.length) {
    const errorMessage = payload.errors.map((error) => error.message).filter(Boolean).join('; ')
    throw new Error(errorMessage || 'GraphQL request failed')
  }

  if (!payload.data) {
    throw new Error('GraphQL response did not include data')
  }

  return payload.data
}

export async function getHomeCriticalData(): Promise<{ cvUrl: string }> {
  const data = await requestGraphql<HomeCriticalQueryData>(HOME_CRITICAL_QUERY)
  return {
    cvUrl: data.cvs?.[0]?.document?.url ?? '',
  }
}

export async function getHomeContentData(): Promise<HomeContentQueryData> {
  const data = await requestGraphql<HomeContentQueryData>(HOME_CONTENT_QUERY)
  return {
    projects: data.projects ?? [],
    skills: data.skills ?? [],
  }
}
