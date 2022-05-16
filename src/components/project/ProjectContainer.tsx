import React from 'react'
import { Box, Grid } from '@mui/material'
import { Project } from 'lib/models/Project'
import ProjectCard from 'components/project/ProjectCard'

const ProjectContainer = (props: { projects: Project[] }): JSX.Element => {
  const { projects } = props

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 112px)`,
        display: 'flex',
        paddingTop: 8,
      }}
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
