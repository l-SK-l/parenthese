// Langue de l'interface : français, anglais ou russe.
//
// Le texte français sert de clé : t('Mot de passe incorrect.') renvoie la phrase telle quelle en
// français, et sa traduction du dictionnaire anglais (./en) ou russe (./ru) sinon. Une clé absente
// du russe retombe sur l'anglais, puis sur le français, jamais sur une chaîne vide.
//
// Variables entre accolades : t('{n} personnes', { n: 3 }).
//
// Pluriel : le russe a trois formes (1 человек, 2 человека, 5 человек). Une traduction peut donc
// être un objet { one, few, many }, choisi selon {n}, ou selon la variable nommée par count
// ({ count: 'age', … } pour t('{age} ans', { age })). Le code garde son choix singulier/pluriel
// français, les deux clés pointent simplement vers le même objet.
//
// La langue est fixée au chargement de la page : choix mémorisé, sinon le russe, quelle que soit la
// langue du navigateur (instance auto-hébergée pour une famille russophone).
// Changer de langue recharge la page, ce qui permet d'appeler t() partout, y compris hors React
// (dessin de l'arbre sur canvas, données de la démo, messages d'erreur).

import en from './en/index.js'
import ru from './ru/index.js'

export const LOCALES = ['ru', 'en', 'fr']
const STORAGE_KEY = 'pz-locale'
const DEFAULT_LOCALE = 'ru'

// Dictionnaires consultés dans l'ordre, le français (la clé) en dernier recours.
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

// Pour toLocaleDateString et consorts.
export const dateLocale = { fr: 'fr-FR', en: 'en-GB', ru: 'ru-RU' }[locale]

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

// Forme plurielle d'une traduction { one, few, many } pour ce nombre. Le nombre peut arriver déjà
// formaté (« 1 234 ») : seuls ses chiffres comptent.
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
