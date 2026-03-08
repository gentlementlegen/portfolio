'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { cookieName, defaultNS, getOptions, languages } from 'components/i18n/settings'

const runsOnServerSide = typeof window === 'undefined'

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }

  const parts = document.cookie.split('; ')
  const rawCookie = parts.find((entry) => entry.startsWith(`${name}=`))

  if (!rawCookie) {
    return null
  }

  const rawValue = rawCookie.slice(name.length + 1)
  return decodeURIComponent(rawValue)
}

function setCookieValue(name: string, value: string): void {
  if (typeof document === 'undefined') {
    return
  }

  const oneYearInSeconds = 60 * 60 * 24 * 365
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${oneYearInSeconds}; SameSite=Lax`
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`../../../public/locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  })

export function useTranslation(lng: string, ns = defaultNS, options?: UseTranslationOptions<undefined>) {
  const ret = useTranslationOrg(ns, options)

  const { i18n } = ret
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (getCookieValue(cookieName) === lng) return
      setCookieValue(cookieName, lng)
    }, [lng])
  }
  return ret
}
