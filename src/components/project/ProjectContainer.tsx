'use client'

import React from 'react'
import { Box, BoxProps, Grid } from '@mui/material'
import ProjectCard from 'components/project/ProjectCard'
import { motion } from 'framer-motion'
import { cardVariant, container } from 'components/animations/cardsReveal'
import { FragmentType, getFragmentData } from 'generated'
import { ProjectElement } from 'components/project/project.operations'

interface ProjectContainerProps extends BoxProps {
  projects: FragmentType<typeof ProjectElement>[]
}

const ProjectContainer = (props: ProjectContainerProps): JSX.Element => {
  const { projects: projectsFragment, sx, ...rest } = props
  const projects = getFragmentData(ProjectElement, projectsFragment)

  return (
    <Box
      sx={[
        {
          paddingTop: 8,
          width: '100%',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <Grid
        component={motion.div}
        container
        justifyContent={'center'}
        id={'projects'}
        spacing={2}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects?.map((project) => (
          <Grid component={motion.div} item sm={3} xs={6} key={project.id} layout variants={cardVariant}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProjectContainer
