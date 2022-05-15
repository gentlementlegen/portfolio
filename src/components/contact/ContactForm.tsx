import React, { useState } from 'react'
import { Container, Grid, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Success from 'components/animated/Success'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { useTranslation } from 'next-i18next'

const MUTATION = gql`
  mutation SendEmail($name: String!, $message: String!, $email: String!) {
    sendEmail(name: $name, message: $message, email: $email)
  }
`

const ContactForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm()
  const [sendEmail, { loading }] = useMutation(MUTATION)
  const [sent, setSent] = useState(false)
  const { t } = useTranslation('common')

  const submitForm = (form) => {
    sendEmail({ variables: form })
      .then(() => setSent(true))
      .catch((e) =>
        setError('message', {
          type: 'manual',
          message: `The message could not be delivered: ${e}`,
        }),
      )
  }

  return (
    <Container
      id={'contact'}
      maxWidth={'sm'}
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={4} justifyContent={'center'}>
          <Grid item xs={12}>
            <Typography variant={'h3'} align={'center'}>
              {t('share')} 🍻
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={'name'}
              label={t('name')}
              variant={'outlined'}
              color={'secondary'}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
              {...register('name', { required: 'This field is required' })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={'email'}
              label={t('email')}
              variant={'outlined'}
              color={'secondary'}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
              {...register('email', { required: 'This field is required' })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={'message'}
              label={t('message')}
              variant={'outlined'}
              color={'secondary'}
              multiline
              minRows={5}
              error={Boolean(errors.message)}
              helperText={errors.message?.message}
              fullWidth
              {...register('message', { required: 'This field is required' })}
            />
          </Grid>
          <Grid item style={{ maxHeight: 68.5 }}>
            <LoadingButton
              style={{ overflow: 'hidden' }}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              loading={loading || sent}
              disabled={sent}
              loadingIndicator={sent ? <Success /> : undefined}
            >
              {t('submit')}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ContactForm
