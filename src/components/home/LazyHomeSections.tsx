'use client'

import { Box, SxProps, Theme } from '@mui/material'
import dynamic from 'next/dynamic'
import { ProjectsAndSkillsQuery } from 'generated/graphql'
import { ReactNode, useEffect, useRef, useState } from 'react'

const AboutSection = dynamic(() => import('components/about/AboutSection'))
const SkillContainer = dynamic(() => import('components/skills/SkillContainer'))
const ProjectContainer = dynamic(() => import('components/project/ProjectContainer'))
const ContactForm = dynamic(() => import('components/contact/ContactForm'))

type LazyHomeSectionsProps = {
  lang: string
  projects: ProjectsAndSkillsQuery['projects']
  skills: ProjectsAndSkillsQuery['skills']
}

type DeferredSectionProps = {
  anchorId: string
  placeholderSx: SxProps<Theme>
  children: ReactNode
}

function DeferredSection({ anchorId, placeholderSx, children }: DeferredSectionProps) {
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
  }, [isVisible])

  if (isVisible) {
    return <>{children}</>
  }

  return <Box id={anchorId} ref={sentinelRef} sx={placeholderSx} />
}

export default function LazyHomeSections({ lang, projects, skills }: LazyHomeSectionsProps) {
  return (
    <>
      <DeferredSection anchorId={'about'} placeholderSx={{ minHeight: { xs: 280, md: 340 } }}>
        <AboutSection lang={lang} />
      </DeferredSection>

      <DeferredSection anchorId={'skills'} placeholderSx={{ minHeight: { xs: 320, md: 420 } }}>
        <SkillContainer skills={skills} lang={lang} />
      </DeferredSection>

      <DeferredSection anchorId={'projects'} placeholderSx={{ minHeight: { xs: 380, md: 520 } }}>
        <ProjectContainer projects={projects} lang={lang} />
      </DeferredSection>

      <DeferredSection anchorId={'contact'} placeholderSx={{ minHeight: { xs: 420, md: 520 } }}>
        <ContactForm lang={lang} />
      </DeferredSection>
    </>
  )
}
