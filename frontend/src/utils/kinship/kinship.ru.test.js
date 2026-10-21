import { describe, it, expect } from 'vitest'
import { nameKinship } from './index.js'

// Hand-written path: moves = the steps, sex = sex of the person at the end, extra = fields per step
const path = (moves, sex = null, extra = {}) => ({
  from: { id: 'me', sex: null, birthYear: null },
  steps: moves.map((move, i) => ({ move, person: { id: `p${i}`, sex: i === moves.length - 1 ? sex : null, birthYear: null, ...(extra[i] || {}) } })),
})

const ru = (moves, extra) => ['male', 'female', null].map((sex) => nameKinship(path(moves, sex, extra), 'ru'))
// Path through a spouse whose sex is known: the spouse is the person reached by the first step
const viaHusband = (moves) => ru(moves, { 0: { sex: 'male' } })
const viaWife = (moves) => ru(moves, { 0: { sex: 'female' } })

describe('Russian kinship names', () => {
  it('blood relatives, gendered when the sex is known, double form otherwise', () => {
    expect(ru(['up'])).toEqual(['Отец', 'Мать', 'Родитель'])
    expect(ru(['down'])).toEqual(['Сын', 'Дочь', 'Ребёнок'])
    expect(ru(['sibling'])).toEqual(['Брат', 'Сестра', 'Брат/сестра'])
    expect(ru(['up', 'up'])).toEqual(['Дедушка', 'Бабушка', 'Дедушка/бабушка'])
    expect(ru(['up', 'up', 'up'])).toEqual(['Прадедушка', 'Прабабушка', 'Прадедушка/прабабушка'])
    expect(ru(['up', 'up', 'up', 'up', 'up'])[0]).toBe('Предок в 5-м поколении')
    expect(ru(['down', 'down'])).toEqual(['Внук', 'Внучка', 'Внук/внучка'])
    expect(ru(['down', 'down', 'down', 'down', 'down'])[1]).toBe('Потомок в 5-м поколении')
    expect(ru(['up', 'sibling'])).toEqual(['Дядя', 'Тётя', 'Дядя/тётя'])
    expect(ru(['up', 'up', 'sibling'])).toEqual(['Двоюродный дедушка', 'Двоюродная бабушка', 'Двоюродный дедушка/бабушка'])
    expect(ru(['sibling', 'down'])).toEqual(['Племянник', 'Племянница', 'Племянник/племянница'])
    expect(ru(['sibling', 'down', 'down'])).toEqual(['Внучатый племянник', 'Внучатая племянница', 'Внучатый племянник/племянница'])
  })

  it('cousins, and the parents and children of cousins', () => {
    expect(ru(['up', 'sibling', 'down'])).toEqual(['Двоюродный брат', 'Двоюродная сестра', 'Двоюродный брат/двоюродная сестра'])
    expect(ru(['up', 'up', 'sibling', 'down', 'down'])).toEqual(['Троюродный брат', 'Троюродная сестра', 'Троюродный брат/троюродная сестра'])
    expect(ru(['up', 'up', 'sibling', 'down'])).toEqual(['Двоюродный дядя', 'Двоюродная тётя', 'Двоюродный дядя/двоюродная тётя'])
    expect(ru(['up', 'sibling', 'down', 'down'])).toEqual(['Двоюродный племянник', 'Двоюродная племянница', 'Двоюродный племянник/двоюродная племянница'])
    expect(ru(['up', 'up', 'up', 'up', 'up', 'sibling', 'down', 'down', 'down', 'down', 'down'])[0]).toBe('Дальний родственник')
    expect(ru(['up', 'up', 'up', 'sibling', 'down'])[1]).toBe('Дальняя родственница')
  })

  it('spouse and step relatives', () => {
    expect(ru(['spouse'])).toEqual(['Муж', 'Жена', 'Супруг(а)'])
    expect(ru(['up', 'spouse'])).toEqual(['Отчим', 'Мачеха', 'Отчим/мачеха'])
    expect(ru(['spouse', 'down'])).toEqual(['Пасынок', 'Падчерица', 'Пасынок/падчерица'])
    expect(ru(['down', 'spouse'])).toEqual(['Зять', 'Невестка', 'Зять/невестка'])
    expect(ru(['sibling', 'spouse'])).toEqual(['Зять', 'Невестка', 'Зять/невестка'])
  })

  it("a spouse's parents and siblings follow the spouse's sex", () => {
    expect(viaHusband(['spouse', 'up'])).toEqual(['Свёкор', 'Свекровь', 'Свёкор/свекровь'])
    expect(viaWife(['spouse', 'up'])).toEqual(['Тесть', 'Тёща', 'Тесть/тёща'])
    expect(ru(['spouse', 'up'])).toEqual(['Свёкор/тесть', 'Свекровь/тёща', 'Родитель супруга'])
    expect(viaHusband(['spouse', 'sibling'])).toEqual(['Деверь', 'Золовка', 'Деверь/золовка'])
    expect(viaWife(['spouse', 'sibling'])).toEqual(['Шурин', 'Свояченица', 'Шурин/свояченица'])
    expect(ru(['spouse', 'sibling'])).toEqual(['Деверь/шурин', 'Золовка/свояченица', 'Брат/сестра супруга'])
  })

  it('other relatives by marriage keep the blood name, marked by marriage', () => {
    expect(ru(['up', 'sibling', 'spouse'])).toEqual(['Дядя (по браку)', 'Тётя (по браку)', 'Дядя/тётя (по браку)'])
    expect(ru(['spouse', 'up', 'sibling'])[1]).toBe('Тётя (по браку)')
  })

  it('"other" sex takes the double forms, like unspecified', () => {
    expect(['up', 'down', 'sibling', 'spouse'].map((move) => nameKinship(path([move], 'other'), 'ru'))).toEqual(['Родитель', 'Ребёнок', 'Брат/сестра', 'Супруг(а)'])
  })
})
