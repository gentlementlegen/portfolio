import React from 'react'
import { Grid } from '@mui/material'
import ProjectCard from './ProjectCard'
import { makeStyles } from '@mui/styles'
import Theme from '../../pages/theme'

const useStyles = makeStyles<typeof Theme>((theme) => ({
  mainTitle: {
    minHeight: `calc(100vh - 112px)`,
    backgroundColor: theme.palette.background.paper,
  },
}))

const ProjectContainer = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.mainTitle}>
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
    </div>
  )
}

export default ProjectContainer
