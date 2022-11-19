import React from 'react'
import { Box, BoxProps, Grid } from '@mui/material'
import ProjectCard from 'components/project/ProjectCard'
import { Project } from 'generated/graphql'

interface ProjectContainerProps extends BoxProps {
  projects: Project[]
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
      <Grid container justifyContent={'center'} id={'projects'} spacing={2}>
        {projects?.map((project) => (
          <Grid item sm={3} xs={6} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProjectContainer
