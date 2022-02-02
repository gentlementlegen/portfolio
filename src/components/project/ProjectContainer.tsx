import React from 'react'
import { Box, Grid } from '@mui/material'
import ProjectCard from './ProjectCard'
import theme from 'theme'

const ProjectContainer = (): JSX.Element => {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 112px)`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Grid container justifyContent={'center'} id={'projects'} spacing={4}>
        <Grid item sm={4} xs={6}>
          <ProjectCard title={'project 1'} />
        </Grid>
        <Grid item sm={4} xs={6}>
          <ProjectCard title={'project 1'} />
        </Grid>
        <Grid item sm={4} xs={6}>
          <ProjectCard title={'project 1'} />
        </Grid>
        <Grid item sm={4} xs={6}>
          <ProjectCard title={'project 1'} />
        </Grid>
        <Grid item sm={4} xs={6}>
          <ProjectCard title={'project 1'} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectContainer
