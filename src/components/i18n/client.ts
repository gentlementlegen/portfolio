'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next'
import { cookieName, defaultNS, fallbackLng, getOptions, languages } from 'components/i18n/settings'
import enCommon from '../../../public/locales/en/common.json'
import frCommon from '../../../public/locales/fr/common.json'
import koCommon from '../../../public/locales/ko/common.json'

const runsOnServerSide = typeof window === 'undefined'
const supportedLanguages = new Set<string>(languages)
const resources = {
  en: { common: enCommon },
  fr: { common: frCommon },
  ko: { common: koCommon },
}

function normalizeLanguage(value?: string | null): string | null {
  const normalizedLanguage = value?.toLowerCase().split('-')[0]
  return normalizedLanguage && supportedLanguages.has(normalizedLanguage) ? normalizedLanguage : null
}

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

function getInitialLanguage(): string {
  if (runsOnServerSide) {
    return fallbackLng
  }

  const pathLanguage = normalizeLanguage(window.location.pathname.split('/')[1])
  const htmlLanguage = normalizeLanguage(document.documentElement.lang)
  const cookieLanguage = normalizeLanguage(getCookieValue(cookieName))
  const navigatorLanguage = (navigator.languages ?? [navigator.language]).map(normalizeLanguage).find(Boolean)

  return pathLanguage ?? htmlLanguage ?? cookieLanguage ?? navigatorLanguage ?? fallbackLng
}

i18next.use(initReactI18next).init({
  ...getOptions(getInitialLanguage()),
  resources,
  initAsync: false,
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
