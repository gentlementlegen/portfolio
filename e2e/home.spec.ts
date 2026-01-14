import 'dotenv/config'
import { APIRequestContext, expect, test } from '@playwright/test'

type ProjectPageData = {
  slug: string
  title: string
  category: string
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

async function fetchProjectPageData(request: APIRequestContext): Promise<ProjectPageData> {
  if (!backendUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not set')
  }

  const response = await request.post(backendUrl, {
    data: {
      query: `
        query ProjectPages($first: Int) {
          projects(first: $first) {
            slug
            title
            categories
          }
        }
      `,
      variables: { first: 1 },
    },
  })

  if (!response.ok()) {
    throw new Error(`Failed to fetch project data: ${response.status()} ${response.statusText()}`)
  }

  const payload = (await response.json()) as {
    data?: { projects?: Array<{ slug?: string | null; title?: string | null; categories?: string[] | null }> }
    errors?: Array<{ message?: string }>
  }

  if (payload.errors?.length) {
    throw new Error(`GraphQL error: ${payload.errors.map((error) => error.message).join(', ')}`)
  }

  const project = payload.data?.projects?.[0]
  const slug = project?.slug ?? ''
  const title = project?.title ?? ''
  const category = project?.categories?.[0] ?? 'others'

  if (!slug || !title) {
    throw new Error('Project data is missing slug or title')
  }

  return { slug, title, category }
}

test.describe('home page', () => {
  test('renders hero and navigation', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByRole('heading', { name: /welcome to my portfolio/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /fernand veyrier/i })).toBeVisible()
  })

  test('shows the contact form fields', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible()
  })
})

test.describe('project routing', () => {
  let project: ProjectPageData

  test.beforeAll(async ({ request }) => {
    project = await fetchProjectPageData(request)
  })

  test('loads the category page', async ({ page }) => {
    await page.goto(`/en/${project.category}`)

    await expect(page.getByRole('heading', { name: new RegExp(`all my\\s+${project.category}`, 'i') })).toBeVisible()
  })

  test('loads the project details page', async ({ page }) => {
    await page.goto(`/en/${project.category}/${project.slug}`)

    await expect(page.getByRole('heading', { name: project.title })).toBeVisible()
    await expect(page.getByRole('heading', { name: /all recent work/i })).toBeVisible()
  })
})
