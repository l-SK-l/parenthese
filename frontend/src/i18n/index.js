// Interface language: French, English or Russian.
//
// The French text is the key: t('Mot de passe incorrect.') returns the sentence as is in French,
// and its translation from the English (./en) or Russian (./ru) dictionary otherwise. A key missing
// from Russian falls back to English, then to French, never to an empty string.
//
// Variables in braces: t('{n} personnes', { n: 3 }).
//
// Plurals: Russian has three forms (1 человек, 2 человека, 5 человек). A translation can therefore
// be an object { one, few, many }, picked by {n}, or by the variable named in count
// ({ count: 'age', … } for t('{age} ans', { age })). The code keeps its French singular/plural
// choice, both keys simply point to the same object.
//
// The language is fixed when the page loads: the remembered choice, otherwise Russian, whatever the
// browser language (self-hosted instance for a Russian-speaking family).
// Switching language reloads the page, which lets t() be called anywhere, including outside React
// (tree drawing on the canvas, demo data, error messages).

import en from './en/index.js'
import ru from './ru/index.js'

export const LOCALES = ['ru', 'en', 'fr']
const STORAGE_KEY = 'pz-locale'
const DEFAULT_LOCALE = 'ru'

// Dictionaries looked up in order, French (the key) as the last resort.
const DICTIONARIES = { fr: [], en: [en], ru: [ru, en] }

function detectLocale() {
  // ?lang=en dans l'adresse l'emporte (liens partagés vers la démo en anglais) et devient le choix mémorisé.
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (LOCALES.includes(fromUrl)) {
    try { window.localStorage.setItem(STORAGE_KEY, fromUrl) } catch { /* rien */ }
    return fromUrl
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (LOCALES.includes(stored)) return stored
  } catch { /* stockage indisponible : langue par défaut */ }
  return DEFAULT_LOCALE
}

export const locale = typeof window === 'undefined' ? 'fr' : detectLocale()

// Pour toLocaleDateString et consorts : la région du navigateur dans la langue de l'interface (en-US, fr-CA…),
// sinon fr-FR ou en-GB. Elle décide de l'ordre jour, mois, année et du séparateur (issue #152).
function regionalDateLocale() {
  const fallback = { fr: 'fr-FR', en: 'en-GB', ru: 'ru-RU' }[locale]
  const languages = typeof navigator === 'undefined' ? [] : (navigator.languages?.length ? navigator.languages : [navigator.language])
  const regional = languages.find((lang) => new RegExp(`^${locale}-[a-z]{2}$`, 'i').test(String(lang)))
  if (!regional) return fallback
  try { return Intl.DateTimeFormat.supportedLocalesOf(regional)[0] || fallback } catch { return fallback }
}
export const dateLocale = regionalDateLocale()

// Une date en chiffres dans cette région : ordre ('dmy', 'mdy' ou 'ymd') et séparateur (« / », « - », « . »)
export const dateFormat = (() => {
  try {
    const parts = new Intl.DateTimeFormat(dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric' }).formatToParts(new Date(Date.UTC(2026, 9, 25)))
    const order = parts.filter((p) => ['day', 'month', 'year'].includes(p.type)).map((p) => p.type[0]).join('')
    const sep = parts.find((p) => p.type === 'literal')?.value.trim() || '/'
    return ['dmy', 'mdy', 'ymd'].includes(order) ? { order, sep } : { order: 'dmy', sep: '/' }
  } catch { return { order: 'dmy', sep: '/' } }
})()

if (typeof document !== 'undefined') document.documentElement.lang = locale

const missing = new Set()

// Typographie française : espace fine insécable avant ? ! ;, insécable avant : et à l'intérieur
// des « », insécable entre un nombre (ou une variable) et son unité. Appliquée au texte avant le
// remplacement des variables, qui gardent leurs espaces (noms, adresses). Le dictionnaire anglais
// reste indexé sur le français tel qu'écrit dans le code.
const NNBSP = '\u202F'
const NBSP = '\u00A0'
const typoCache = new Map()
export function frenchTypography(text) {
  if (typeof text !== 'string') return text
  let out = typoCache.get(text)
  if (out !== undefined) return out
  out = text
    .replace(/(?<=[^\s\u00A0\u202F])[ \u00A0](?=[?!;])/g, NNBSP)
    .replace(/(?<=[^\s\u00A0\u202F])[ \u202F](?=:)/g, NBSP)
    .replace(/«[ \u202F]?(?!\u00A0)/g, `«${NBSP}`)
    .replace(/(?<!\u00A0)[ \u202F]?»/g, `${NBSP}»`)
    .replace(/(?<=[\d}]) (?=(?:%|€|km|kg|cm|mm|Mo|Go|Ko|ko|min|px|h)(?![\p{L}\d]))/gu, NBSP)
  typoCache.set(text, out)
  return out
}

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

// Plural form of a { one, few, many } translation for this number. The number may arrive already
// formatted ("1 234"): only its digits count.
const pluralRules = new Map()
export function selectPlural(forms, count, lang = locale) {
  const n = typeof count === 'number' ? count : Number(String(count ?? '').replace(/\D/g, ''))
  if (!pluralRules.has(lang)) pluralRules.set(lang, new Intl.PluralRules(lang))
  const category = pluralRules.get(lang).select(n)
  return forms[category] ?? forms.other ?? forms.many
}

export function t(fr, vars) {
  let text = locale === 'fr' ? frenchTypography(fr) : fr
  const dictionaries = DICTIONARIES[locale]
  if (dictionaries.length) {
    const found = dictionaries.find((dictionary) => hasOwn(dictionary, fr))
    if (found) text = found[fr]
    if (!hasOwn(dictionaries[0], fr) && import.meta.env?.DEV && !missing.has(fr)) {
      missing.add(fr)
      console.warn(`[i18n] traduction manquante (${locale}) : ${JSON.stringify(fr)}`)
    }
  }
  if (text && typeof text === 'object') text = selectPlural(text, vars?.[text.count ?? 'n'])
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match))
}

export function setLocale(next) {
  if (!LOCALES.includes(next) || next === locale) return
  // Passe par l'adresse, pour que le choix tienne même sans stockage local.
  const url = new URL(window.location.href)
  url.searchParams.set('lang', next)
  window.location.assign(url.toString())
}
