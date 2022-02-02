import React from 'react'
import MainLayout from 'components/layout/MainLayout'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { makeStyles } from '@mui/styles'
import Theme from 'theme'

const MUTATION = gql`
  mutation SendEmail($name: String!, $message: String!, $email: String!) {
    sendEmail(name: $name, message: $message, email: $email)
  }
`

const useStyles = makeStyles<typeof Theme>((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
  },
}))

const ContactPage = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const [sendEmail, { loading }] = useMutation(MUTATION)
  const classes = useStyles()

  const submitForm = (form) => {
    sendEmail({ variables: form })
  }

  return (
    <MainLayout>
      <Container maxWidth={'sm'} className={classes.root}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={4} justifyContent={'center'}>
            <Grid item xs={12}>
              <Typography variant={'h3'}>You want to share a beer with me? Here you go 🍻</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={'name'}
                label={'Name'}
                variant={'outlined'}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                {...register('name', { required: 'This field is required' })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={'email'}
                label={'Email'}
                variant={'outlined'}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                {...register('email', { required: 'This field is required' })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={'message'}
                label={'Message'}
                variant={'outlined'}
                multiline
                minRows={5}
                error={Boolean(errors.message)}
                helperText={errors.message?.message}
                fullWidth
                {...register('message', { required: 'This field is required' })}
              />
            </Grid>
            <Grid item>
              <Button type={'submit'} variant={'contained'} color={'primary'} disabled={loading}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MainLayout>
  )
}

export default ContactPage
