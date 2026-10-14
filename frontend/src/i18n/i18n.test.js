import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import en from './en/index.js'
import ru from './ru/index.js'
import { frenchTypography, selectPlural, t } from './index.js'

const SRC = fileURLToPath(new URL('..', import.meta.url))

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === 'i18n' ? [] : sourceFiles(path)
    return /\.(js|jsx)$/.test(name) && !/\.test\./.test(name) ? [path] : []
  })
}

// Appels t('…') ou t("…") à texte littéral. Les appels à clé calculée ne sont pas vérifiables ici.
function literalKeys(code) {
  const keys = []
  const re = /\bt\(\s*(['"])((?:\\.|(?!\1).)*)\1/g
  let match
  while ((match = re.exec(code))) keys.push(match[2].replace(/\\(['"\\])/g, '$1'))
  return keys
}

describe('i18n', () => {
  it('garde le français tel quel et remplace les variables', () => {
    expect(t('Bonjour')).toBe('Bonjour')
    expect(t('{n} personnes', { n: 3 })).toBe('3 personnes')
  })

  it('chaque texte passé à t() a sa traduction anglaise', () => {
    const missing = []
    for (const file of sourceFiles(SRC)) {
      for (const key of literalKeys(readFileSync(file, 'utf8'))) {
        if (!Object.prototype.hasOwnProperty.call(en, key)) missing.push(`${file.slice(SRC.length)} : ${key}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('les traductions gardent les mêmes variables', () => {
    const vars = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join(',')
    const mismatched = Object.entries(en).filter(([fr, english]) => vars(fr) !== vars(english)).map(([fr]) => fr)
    expect(mismatched).toEqual([])
  })

  it('le russe traduit exactement les mêmes textes que l’anglais', () => {
    expect(Object.keys(en).filter((fr) => !Object.prototype.hasOwnProperty.call(ru, fr))).toEqual([])
    expect(Object.keys(ru).filter((fr) => !Object.prototype.hasOwnProperty.call(en, fr))).toEqual([])
  })

  it('le russe garde les mêmes variables, dans chaque forme plurielle', () => {
    const vars = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join(',')
    const mismatched = Object.entries(ru).filter(([fr, russian]) => {
      if (typeof russian === 'string') return vars(fr) !== vars(russian)
      const { count = 'n', ...forms } = russian
      return !fr.includes(`{${count}}`)
        || !['one', 'few', 'many'].every((form) => typeof forms[form] === 'string')
        || Object.values(forms).some((text) => vars(fr) !== vars(text))
    }).map(([fr]) => fr)
    expect(mismatched).toEqual([])
  })

  it('choisit la forme plurielle russe selon le nombre, même déjà formaté', () => {
    const forms = { one: 'один', few: 'несколько', many: 'много' }
    expect([0, 1, 2, 5, 11, 21, 22, 25, 111].map((n) => selectPlural(forms, n, 'ru')))
      .toEqual(['много', 'один', 'несколько', 'много', 'много', 'один', 'несколько', 'много', 'много'])
    expect(selectPlural(forms, '1 234', 'ru')).toBe('несколько')
  })

  it('pose les espaces insécables du français sans toucher aux variables', () => {
    expect(frenchTypography('Quitter {em} ?')).toBe('Quitter {em}\u202F?')
    expect(frenchTypography('Prénom : {name}')).toBe('Prénom\u00A0: {name}')
    expect(frenchTypography('Touchez « Ajouter »')).toBe('Touchez «\u00A0Ajouter\u00A0»')
    expect(frenchTypography('Jusqu’à 20 Mo, {n} Mo')).toBe('Jusqu’à 20\u00A0Mo, {n}\u00A0Mo')
    expect(frenchTypography('https://app.parenthese.io/?lang=fr')).toBe('https://app.parenthese.io/?lang=fr')
    expect(frenchTypography('?')).toBe('?')
  })
})
