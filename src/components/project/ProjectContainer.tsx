import React from 'react'
import { Box, BoxProps, Grid } from '@mui/material'
import ProjectCard from 'components/project/ProjectCard'
import { Project } from 'generated/graphql'
import { motion, Variants } from 'framer-motion'

interface ProjectContainerProps extends BoxProps {
  projects: Project[]
}

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    translateY: 50,
  },
  visible: {
    opacity: 1,
    translateY: 0,
  },
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
}

const ProjectContainer = (props: ProjectContainerProps): JSX.Element => {
  const { projects, sx, ...rest } = props

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
