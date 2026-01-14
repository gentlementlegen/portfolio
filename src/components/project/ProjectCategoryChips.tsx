'use client'

import React from 'react'
import { Chip, Stack } from '@mui/material'
import Link from 'next/link'

interface ProjectCategoryChipsProps {
  categories: string[]
}

const capitalizeFirstLetter = (value: string) => value.charAt(0).toLocaleUpperCase() + value.slice(1)

const ProjectCategoryChips = ({ categories }: ProjectCategoryChipsProps) => {
  if (!categories.length) {
    return null
  }

  return (
    <Stack direction={'row'} spacing={1} sx={{ mb: 2 }}>
      {categories.map((category) => (
        <Chip
          label={capitalizeFirstLetter(category)}
          color={'link'}
          component={Link}
          clickable
          key={category}
          href={`/${category.toLocaleLowerCase()}`}
          passHref
        />
      ))}
    </Stack>
  )
}

export default ProjectCategoryChips
