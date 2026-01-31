'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

export function useScrollToTopOnHomeClick(lang: string) {
  const pathname = usePathname()

  return React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const normalize = (p: string) => p.replace(/\/$/, '') || '/'
      const current = normalize(pathname)
      const home = normalize(`/${lang}`)

      const isHome = current === '/' || current === home
      if (!isHome) return

      e.preventDefault()

      // Smooth scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Remove hash without extra history entry
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    },
    [pathname, lang],
  )
}
