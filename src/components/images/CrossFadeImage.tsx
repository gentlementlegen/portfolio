'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'

const CrossfadeImage = ({ images }: { images: Array<string> }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transition: 'opacity 1s ease-in-out',
            opacity: index === currentImage ? 1 : 0,
          }}
        >
          <Image src={image} alt={`Image ${index}`} layout="fill" objectFit="cover" />
        </Box>
      ))}
    </Box>
  )
}

export default CrossfadeImage
