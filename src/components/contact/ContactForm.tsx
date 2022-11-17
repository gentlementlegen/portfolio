import React, { useState } from 'react'
import { Container, Grid, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Success from 'components/animated/Success'
import { FieldError, useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { MutationCreateMessageArgs } from 'generated/graphql'

const MUTATION_SEND_EMAIL = gql`
  mutation CreateMessage($data: MessageCreateInput!) {
    createMessage(data: $data) {
      id
    }
  }
`

const ContactForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<MutationCreateMessageArgs>()
  const [sendEmail, { loading }] = useMutation<{ sendEmail: string }, MutationCreateMessageArgs>(MUTATION_SEND_EMAIL)
  const [sent, setSent] = useState(false)
  const { t } = useTranslation('common')

  const submitForm = (form: MutationCreateMessageArgs) => {
    sendEmail({ variables: form })
      .then(() => setSent(true))
      .catch((e) =>
        setError('data.message', {
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
              error={Boolean(errors.data?.name)}
              helperText={errors.data?.name?.message}
              fullWidth
              {...register('data.name', { required: t('required') })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={'email'}
              label={t('email')}
              variant={'outlined'}
              color={'secondary'}
              error={Boolean(errors.data?.email)}
              helperText={errors.data?.email?.message}
              fullWidth
              {...register('data.email', { required: t('required') })}
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
              error={Boolean(errors.data?.message)}
              helperText={(errors.data?.message as FieldError)?.message}
              fullWidth
              {...register('data.message', { required: t('required') })}
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
