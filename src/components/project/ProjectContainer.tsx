import React from 'react'
import { Box, Grid } from '@mui/material'
import ProjectCard from './ProjectCard'
import { gql, useQuery } from '@apollo/client'

const QUERY = gql`
  query Projects {
    allProjects {
      id
      title
    }
  }
`

const ProjectContainer = (): JSX.Element => {
  const { data } = useQuery(QUERY)

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 112px)`,
      }}
    >
      <Grid container justifyContent={'center'} id={'projects'} spacing={4}>
        {data?.allProjects?.map((project) => (
          <Grid item sm={4} xs={6} key={project.id}>
            <ProjectCard title={project.title} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProjectContainer
