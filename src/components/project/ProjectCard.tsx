import { GitHub, LaunchRounded } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardContent, CardProps, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ProjectElementFragment } from 'generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react'

interface ProjectCardProps extends CardProps {
  project: ProjectElementFragment
  labels: {
    liveDemo: string
    code: string
  }
  onActionAreaClick?: (id: ProjectElementFragment) => void
}

const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { project, labels, onActionAreaClick = () => {}, sx, ...rest } = props
  const description = project.description?.text ?? ''
  const tagLabels =
    project.skills?.length > 0
      ? project.skills.map((skill) => skill.name)
      : (project.categories?.map((category) => {
          const label = `${category}`
          return `${label.charAt(0).toUpperCase()}${label.slice(1)}`
        }) ?? [])
  const internalHref = `/${!!project.categories?.length ? project.categories[0].toLowerCase() : 'others'}/${project.slug}`
  const liveDemoUrl = project.projectUrl ?? ''
  const codeUrl = project.projectCodeUrl ?? ''

  const handleCardActionAreaClick = () => {
    onActionAreaClick(project)
  }

  const renderAction = (label: string, href: string, icon: JSX.Element) => {
    const disabled = !href
    return (
      <Box
        component={disabled ? 'span' : 'a'}
        href={disabled ? undefined : href}
        target={disabled ? undefined : '_blank'}
        rel={disabled ? undefined : 'noreferrer'}
        sx={(theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          color: theme.palette.text.secondary,
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          '& svg': {
            fontSize: '1.1rem',
          },
          '&:hover': {
            color: disabled ? theme.palette.text.secondary : theme.palette.text.primary,
          },
          ...(disabled
            ? {
                opacity: 0.45,
                cursor: 'not-allowed',
              }
            : {
                cursor: 'pointer',
              }),
        })}
      >
        {icon}
        <Typography component={'span'} variant={'body2'}>
          {label}
        </Typography>
      </Box>
    )
  }

  return (
    <Card
      variant={'outlined'}
      sx={[
        (theme) => ({
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 1,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.18 : 0.12)}`,
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.background.paper,
            theme.palette.mode === 'dark' ? 0.55 : 0.9,
          )}, ${alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.88 : 0.98)})`,
          boxShadow: `0 20px 45px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.4 : 0.2)}`,
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.4 : 0.35),
            boxShadow: `0 26px 55px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.5 : 0.25)}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      component={motion.div}
      layout
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      {...rest}
    >
      <CardActionArea
        component={Link}
        href={internalHref}
        onClick={handleCardActionAreaClick}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1 }}
      >
        <Box
          sx={(theme) => ({
            position: 'relative',
            height: { xs: 180, sm: 200, md: 210 },
            width: '100%',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, ${alpha(
                theme.palette.common.black,
                0,
              )} 40%, ${alpha(theme.palette.common.black, 0.35)} 100%)`,
              zIndex: 1,
            },
          })}
        >
          {project.image ? (
            <Image
              src={project.image.url}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              placeholder={'blur'}
              blurDataURL={project.blur ?? ''}
              sizes={'(max-width: 600px) 100vw,(max-width: 900px) 50vw,33vw'}
            />
          ) : (
            <Box
              sx={(theme) => ({
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.25)}, transparent)`,
              })}
            />
          )}
        </Box>
        <CardContent
          sx={{
            padding: { xs: 2.5, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            flexGrow: 1,
          }}
        >
          <Typography variant={'h5'} sx={{ fontWeight: 600 }}>
            {project.title}
          </Typography>
          {description && (
            <Typography
              variant={'body2'}
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          )}
          {tagLabels.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tagLabels.slice(0, 6).map((label) => (
                <Box
                  key={`${project.id}-${label}`}
                  component={'span'}
                  sx={(theme) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    paddingInline: theme.spacing(1.4),
                    paddingBlock: theme.spacing(0.45),
                    borderRadius: 999,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.25 : 0.2)}`,
                    color: theme.palette.text.secondary,
                    backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.08 : 0.05),
                  })}
                >
                  {label}
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      <Box sx={{ padding: { xs: 2.5, sm: 3 }, paddingTop: 0, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {renderAction(labels.liveDemo, liveDemoUrl, <LaunchRounded />)}
        {renderAction(labels.code, codeUrl, <GitHub />)}
      </Box>
    </Card>
  )
}

export default ProjectCard
