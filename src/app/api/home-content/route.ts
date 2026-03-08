import { NextResponse } from 'next/server'
import { getHomeContentData, HOME_REVALIDATE_SECONDS } from 'lib/homeData'

export const revalidate = 1800

export async function GET() {
  try {
    const data = await getHomeContentData()

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${HOME_REVALIDATE_SECONDS}, stale-while-revalidate=${HOME_REVALIDATE_SECONDS * 24}`,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ projects: [], skills: [] }, { status: 500 })
  }
}
