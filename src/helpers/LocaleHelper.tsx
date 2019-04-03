import * as React from 'react'

const langToLocaleMap = {
  de: 'de-DE',
  pl: 'pl-PL',
  en: 'en-EN'
}

export const getLocale = (language: string): string => {
  return langToLocaleMap[language] || 'en-EN'
}

export const getOgLocale = (language: string): string => getLocale(language).replace('-', '_')
