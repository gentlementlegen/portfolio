import React from 'react'
import { Box, Grid } from '@mui/material'
import { Game } from 'lib/models/Game'
import ProjectCard from 'components/project/ProjectCard'

const ProjectContainer = (props: { projects: Game[] }): JSX.Element => {
  const { projects } = props

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 112px)`,
        display: 'flex',
        paddingTop: 4,
      }}
    >
      <Grid container justifyContent={'center'} id={'projects'} spacing={4}>
        {projects?.map((project) => (
          <Grid item sm={4} xs={6} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProjectContainer
