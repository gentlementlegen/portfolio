import React from 'react'
import { Box, Grid } from '@mui/material'
import ProjectCard from 'components/project/ProjectCard'
import { Project } from 'generated/graphql'

const ProjectContainer = (props: { projects: Project[] }): JSX.Element => {
  const { projects } = props

  return (
    <Box
      sx={{
        paddingTop: 8,
        width: '100%',
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
