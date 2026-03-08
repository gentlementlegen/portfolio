'use client'

import { Box, SxProps, Theme, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { ProjectElementFragment, SkillElementFragment } from 'generated/graphql'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

const AboutSection = dynamic(() => import('components/about/AboutSection'))
const SkillContainer = dynamic(() => import('components/skills/SkillContainer'))
const ProjectContainer = dynamic(() => import('components/project/ProjectContainer'))
const ContactForm = dynamic(() => import('components/contact/ContactForm'))

type LazyHomeSectionsProps = {
  lang: string
}

type HomeContentResponse = {
  projects: ProjectElementFragment[]
  skills: SkillElementFragment[]
}

type DeferredSectionProps = {
  anchorId: string
  placeholderSx: SxProps<Theme>
  children: ReactNode
  onVisible?: () => void
}

function DeferredSection({ anchorId, placeholderSx, children, onVisible }: DeferredSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isVisible) {
      return
    }

    const node = sentinelRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onVisible?.()
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '280px 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible, onVisible])

  if (isVisible) {
    return <>{children}</>
  }

  return <Box id={anchorId} ref={sentinelRef} sx={placeholderSx} />
}

export default function LazyHomeSections({ lang }: LazyHomeSectionsProps) {
  const [homeContent, setHomeContent] = useState<HomeContentResponse | null>(null)
  const [homeContentError, setHomeContentError] = useState(false)
  const isLoadingRef = useRef(false)

  const loadHomeContent = useCallback(async () => {
    if (homeContent || homeContentError || isLoadingRef.current) {
      return
    }

    isLoadingRef.current = true

    try {
      const response = await fetch('/api/home-content')
      if (!response.ok) {
        throw new Error(`Failed to load home content (${response.status})`)
      }

      const payload = (await response.json()) as Partial<HomeContentResponse>

      setHomeContent({
        projects: Array.isArray(payload.projects) ? payload.projects : [],
        skills: Array.isArray(payload.skills) ? payload.skills : [],
      })
    } catch (error) {
      console.error(error)
      setHomeContentError(true)
    } finally {
      isLoadingRef.current = false
    }
  }, [homeContent, homeContentError])

  return (
    <>
      <DeferredSection anchorId={'about'} placeholderSx={{ minHeight: { xs: 280, md: 340 } }}>
        <AboutSection lang={lang} />
      </DeferredSection>

      <DeferredSection
        anchorId={'skills'}
        placeholderSx={{ minHeight: { xs: 320, md: 420 } }}
        onVisible={loadHomeContent}
      >
        {homeContent ? (
          <SkillContainer skills={homeContent.skills} lang={lang} />
        ) : (
          <Box
            id={'skills'}
            sx={{
              minHeight: { xs: 320, md: 420 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
            }}
          >
            {homeContentError ? (
              <Typography color={'text.secondary'} align={'center'}>
                {'Skills could not be loaded right now.'}
              </Typography>
            ) : null}
          </Box>
        )}
      </DeferredSection>

      <DeferredSection
        anchorId={'projects'}
        placeholderSx={{ minHeight: { xs: 380, md: 520 } }}
        onVisible={loadHomeContent}
      >
        {homeContent ? (
          <ProjectContainer projects={homeContent.projects} lang={lang} />
        ) : (
          <Box
            id={'projects'}
            sx={{
              minHeight: { xs: 380, md: 520 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
            }}
          >
            {homeContentError ? (
              <Typography color={'text.secondary'} align={'center'}>
                {'Projects could not be loaded right now.'}
              </Typography>
            ) : null}
          </Box>
        )}
      </DeferredSection>

      <DeferredSection anchorId={'contact'} placeholderSx={{ minHeight: { xs: 420, md: 520 } }}>
        <ContactForm lang={lang} />
      </DeferredSection>
    </>
  )
}
