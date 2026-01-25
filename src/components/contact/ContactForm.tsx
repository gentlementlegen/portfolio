'use client'

import { useMutation } from '@apollo/client/react'
import { SendRounded } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import Success from 'components/animated/Success'
import { useTranslation } from 'components/i18n/client'
import { motion, useAnimationControls } from 'framer-motion'
import { graphql } from 'generated'
import { MutationCreateMessageArgs } from 'generated/graphql'
import { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'

const MUTATION_SEND_EMAIL = graphql(/* GraphQL */ `
  mutation CreateMessage($data: MessageCreateInput!) {
    createMessage(data: $data) {
      id
    }
  }
`)

export interface ContactFormProps {
  lang: string
}

const styles: Record<
  'section' | 'header' | 'title' | 'subtitle' | 'card' | 'formControl' | 'label' | 'field' | 'button',
  SxProps<Theme>
> = {
  section: {
    paddingTop: { xs: 6, md: 8 },
    paddingBottom: { xs: 8, md: 10 },
  },
  header: {
    textAlign: 'center',
    marginBottom: { xs: 4, md: 6 },
  },
  title: {
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: { xs: 1, md: 1.5 },
  },
  subtitle: (theme) => ({
    color: theme.palette.text.secondary,
    maxWidth: 640,
    margin: '0 auto',
  }),
  card: (theme) => ({
    padding: { xs: 3, sm: 4, md: 5 },
    borderRadius: 1,
    backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.86 : 0.92),
    border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
    boxShadow: `0 24px 60px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.4 : 0.18)}`,
    backdropFilter: 'blur(12px)',
  }),
  formControl: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: (theme) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
    width: '100%',
    textAlign: 'left',
    position: 'relative',
    transform: 'none',
  }),
  field: (theme) => ({
    '& .MuiInputBase-root': {
      borderRadius: 1,
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.12 : 0.05),
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.text.primary, 0.2),
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.link.main, theme.palette.mode === 'dark' ? 0.7 : 0.5),
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1.6, 2),
    },
    '& .MuiInputBase-multiline': {
      padding: 0,
    },
    '& .MuiInputBase-inputMultiline': {
      padding: theme.spacing(1.6, 2),
    },
    '& .MuiInputBase-input::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.75,
    },
    'label + &': {
      marginTop: theme.spacing(1),
    },
  }),
  button: (theme) => ({
    borderRadius: 14,
    paddingBlock: theme.spacing(1.4),
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
  }),
}

const ContactForm = ({ lang }: ContactFormProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<MutationCreateMessageArgs>()
  const [sendEmail, { loading }] = useMutation(MUTATION_SEND_EMAIL)
  const [sent, setSent] = useState(false)
  const { t } = useTranslation(lang, 'common')
  const controls = useAnimationControls()

  const handleFormError = async (event: { data: Record<string, unknown> }) => {
    const keys = Object.keys(event.data)
    controls
      .start((arg) => (keys.includes(arg) ? { translateX: [15, -15, 7, -7, 0] } : {}))
      .catch((e) => console.error(e))
  }

  const submitForm = async (form: MutationCreateMessageArgs) => {
    const {
      data: { message, ...rest },
    } = form
    try {
      await sendEmail({
        variables: {
          data: {
            ...rest,
            message: {
              type: 'paragraph',
              children: [
                {
                  text: message,
                },
              ],
            },
          },
        },
      })
      setSent(true)
    } catch (e) {
      setError('data.message', {
        type: 'manual',
        message: `The message could not be delivered: ${e}`,
      })
    }
  }

  return (
    <Box id={'contact'} sx={styles.section}>
      <Container maxWidth={'md'} disableGutters>
        <Box sx={styles.header}>
          <Typography variant={'h2'} sx={styles.title}>
            {t('contact heading')}
          </Typography>
          <Typography variant={'body1'} sx={styles.subtitle}>
            {t('contact subtitle')}
          </Typography>
        </Box>
        <Paper variant={'outlined'} sx={styles.card}>
          <form onSubmit={handleSubmit(submitForm, handleFormError)}>
            <Grid container spacing={3} justifyContent={'center'}>
              <Grid size={12} component={motion.div} custom={'name'} transition={{ duration: 0.3 }} animate={controls}>
                <FormControl fullWidth sx={styles.formControl}>
                  <InputLabel shrink htmlFor="contact-name" sx={styles.label}>
                    {t('name')}
                  </InputLabel>
                  <TextField
                    id="contact-name"
                    placeholder={t('name placeholder')}
                    variant={'outlined'}
                    error={Boolean(errors.data?.name)}
                    helperText={errors.data?.name?.message}
                    fullWidth
                    sx={styles.field}
                    {...register('data.name', { required: `${t('required')}` })}
                  />
                </FormControl>
              </Grid>
              <Grid size={12} component={motion.div} custom={'email'} transition={{ duration: 0.3 }} animate={controls}>
                <FormControl fullWidth sx={styles.formControl}>
                  <InputLabel shrink htmlFor="contact-email" sx={styles.label}>
                    {t('email')}
                  </InputLabel>
                  <TextField
                    id="contact-email"
                    placeholder={t('email placeholder')}
                    variant={'outlined'}
                    error={Boolean(errors.data?.email)}
                    helperText={errors.data?.email?.message}
                    fullWidth
                    sx={styles.field}
                    {...register('data.email', { required: `${t('required')}` })}
                  />
                </FormControl>
              </Grid>
              <Grid
                size={12}
                component={motion.div}
                custom={'message'}
                transition={{ duration: 0.3 }}
                animate={controls}
              >
                <FormControl fullWidth sx={styles.formControl}>
                  <InputLabel shrink htmlFor="contact-message" sx={styles.label}>
                    {t('message')}
                  </InputLabel>
                  <TextField
                    id="contact-message"
                    placeholder={t('message placeholder')}
                    variant={'outlined'}
                    multiline
                    minRows={6}
                    error={Boolean(errors.data?.message)}
                    helperText={(errors.data?.message as FieldError)?.message}
                    fullWidth
                    sx={styles.field}
                    {...register('data.message', { required: `${t('required')}` })}
                  />
                </FormControl>
              </Grid>
              <Grid size={12}>
                <Button
                  style={{ overflow: 'hidden' }}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                  loading={loading || sent}
                  disabled={sent}
                  loadingIndicator={sent ? <Success /> : undefined}
                  startIcon={!sent ? <SendRounded fontSize={'small'} /> : undefined}
                  fullWidth
                  sx={styles.button}
                >
                  {t('submit')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default ContactForm
