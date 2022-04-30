import React from 'react'
import { Container, styled, Typography } from '@mui/material'

const Span = styled('span')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'block',
}))

const AboutSection = (): JSX.Element => {
  return (
    <Container maxWidth={'md'}>
      <Typography variant={'h2'} align={'center'}>
        About
      </Typography>
      <Typography>
        <Span>
          Fullstack dev lead programmer in Seoul, South Korea, I&apos;m passionate about video games and everything
          related to it. I spend most of my time playing and learning new things ! I love to be involved in video game
          events such as Game Jams and Ludum Dares.
        </Span>
        <Span>
          I have many other hobbies, like heavy metal music or traveling around the world. I&apos;ve always thought
          these are the two best things to encounter new people, and enrich your own culture.
        </Span>
        <Span>I created this portfolio to share some of my work and show you my passion !</Span>
      </Typography>
    </Container>
  )
}

export default AboutSection
