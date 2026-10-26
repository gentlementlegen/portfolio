import AboutSection from '@/components/about/AboutSection'
import ContactForm from '@/components/contact/ContactForm'
import ProjectContainer from '@/components/project/ProjectContainer'
import SkillContainer from '@/components/skills/SkillContainer'
import { ProjectElementFragment, SkillElementFragment } from '@/generated/graphql'

type HomeSectionsProps = {
  lang: string
  projects: ProjectElementFragment[]
  skills: SkillElementFragment[]
}

export default function HomeSections({ lang, projects, skills }: HomeSectionsProps) {
  return (
    <>
      <AboutSection lang={lang} />
      <SkillContainer skills={skills} lang={lang} />
      <ProjectContainer projects={projects} lang={lang} />
      <ContactForm lang={lang} />
    </>
  )
}
