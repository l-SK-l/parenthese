// Website pages linked from the app, in the interface language. The Russian guide is served by the
// app itself (help/index.html, under /help/); the privacy page stays the English one on parenthese.io.
// A self-hosted instance can point to its own pages: VITE_HELP_URL and VITE_PRIVACY_URL (at build
// time) then replace these links, for every language.
import { locale } from '../i18n/index.js'

const env = import.meta.env || {}

const HELP_URLS = { fr: 'https://parenthese.io/aide/', en: 'https://parenthese.io/en/help/', ru: '/help/' }

export const HELP_URL = env.VITE_HELP_URL || HELP_URLS[locale]

export const PRIVACY_URL = env.VITE_PRIVACY_URL
  || (locale === 'fr' ? 'https://parenthese.io/donnees-et-vie-privee/' : 'https://parenthese.io/en/privacy/')
