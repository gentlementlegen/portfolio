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
    transform: 'translateY(50px)',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
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
      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Grid container justifyContent={'center'} id={'projects'} spacing={2}>
          {projects?.map((project) => (
            <Grid item sm={3} xs={6} key={project.id}>
              <motion.div variants={cardVariant}>
                <ProjectCard project={project} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  )
}

export default ProjectContainer
