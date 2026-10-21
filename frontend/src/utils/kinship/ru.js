import { kinshipFacts, normalizeSex } from './facts.js'

// Gendered word when the sex of the named person is known, double or neutral form otherwise
const g = (sex, male, female, both) => (sex === 'male' ? male : sex === 'female' ? female : both)

// Russian names an in-law by the side of the marriage: a husband's parents (свёкор, свекровь) are not
// a wife's (тесть, тёща), nor are his siblings (деверь, золовка) hers (шурин, свояченица). The
// spouse is the person reached by the spouse step; unknown sex keeps both words.
function inLawName(path, ups, downs, sex) {
  const { steps } = path
  const viaSpouseFirst = steps[0].move === 'spouse'
  const spouseSex = normalizeSex(steps[0].person?.sex)
  const last = steps[steps.length - 1].move

  if (ups === 1 && downs === 0) {
    if (!viaSpouseFirst) return g(sex, 'Отчим', 'Мачеха', 'Отчим/мачеха')
    if (spouseSex === 'male') return g(sex, 'Свёкор', 'Свекровь', 'Свёкор/свекровь')
    if (spouseSex === 'female') return g(sex, 'Тесть', 'Тёща', 'Тесть/тёща')
    return g(sex, 'Свёкор/тесть', 'Свекровь/тёща', 'Родитель супруга')
  }
  if (ups === 0 && downs === 1) {
    return viaSpouseFirst ? g(sex, 'Пасынок', 'Падчерица', 'Пасынок/падчерица') : g(sex, 'Зять', 'Невестка', 'Зять/невестка')
  }
  if (ups === 1 && downs === 1) {
    if (viaSpouseFirst && last === 'sibling') {
      if (spouseSex === 'male') return g(sex, 'Деверь', 'Золовка', 'Деверь/золовка')
      if (spouseSex === 'female') return g(sex, 'Шурин', 'Свояченица', 'Шурин/свояченица')
      return g(sex, 'Деверь/шурин', 'Золовка/свояченица', 'Брат/сестра супруга')
    }
    // A sister's husband and a brother's wife
    if (!viaSpouseFirst && last === 'spouse') return g(sex, 'Зять', 'Невестка', 'Зять/невестка')
    return g(sex, 'Свойственник', 'Свойственница', 'Свойственник/свойственница')
  }
  return null
}

// Cousins and their parents or children: двоюродный for first cousins, троюродный for second ones
const COUSIN_PREFIX = { 1: ['Двоюродный', 'Двоюродная'], 2: ['Троюродный', 'Троюродная'], 3: ['Четвероюродный', 'Четвероюродная'] }

function cousinName(ups, downs, sex) {
  const degree = Math.min(ups, downs) - 1
  const removed = ups - downs
  const prefix = COUSIN_PREFIX[degree]
  if (!prefix) return g(sex, 'Дальний родственник', 'Дальняя родственница', 'Дальний родственник')
  const [m, f] = prefix
  const lower = (word) => word.toLowerCase()
  if (removed === 0) return g(sex, `${m} брат`, `${f} сестра`, `${m} брат/${lower(f)} сестра`)
  // A parent's cousin is a двоюродный дядя, a cousin's child a двоюродный племянник
  if (removed === 1) return g(sex, `${m} дядя`, `${f} тётя`, `${m} дядя/${lower(f)} тётя`)
  if (removed === -1) return g(sex, `${m} племянник`, `${f} племянница`, `${m} племянник/${lower(f)} племянница`)
  return g(sex, 'Дальний родственник', 'Дальняя родственница', 'Дальний родственник')
}

export default function nameRu(path) {
  const { ups, downs, hasSpouse, sex } = kinshipFacts(path)

  if (hasSpouse && ups === 0 && downs === 0) return g(sex, 'Муж', 'Жена', 'Супруг(а)')

  if (hasSpouse) {
    const inLaw = inLawName(path, ups, downs, sex)
    if (inLaw) return inLaw
  }

  let label
  if (downs === 0 && ups > 0) {
    if (ups === 1) label = g(sex, 'Отец', 'Мать', 'Родитель')
    else if (ups === 2) label = g(sex, 'Дедушка', 'Бабушка', 'Дедушка/бабушка')
    else if (ups === 3) label = g(sex, 'Прадедушка', 'Прабабушка', 'Прадедушка/прабабушка')
    else if (ups === 4) label = g(sex, 'Прапрадедушка', 'Прапрабабушка', 'Прапрадедушка/прапрабабушка')
    else label = `Предок в ${ups}-м поколении`
  } else if (ups === 0 && downs > 0) {
    if (downs === 1) label = g(sex, 'Сын', 'Дочь', 'Ребёнок')
    else if (downs === 2) label = g(sex, 'Внук', 'Внучка', 'Внук/внучка')
    else if (downs === 3) label = g(sex, 'Правнук', 'Правнучка', 'Правнук/правнучка')
    else if (downs === 4) label = g(sex, 'Праправнук', 'Праправнучка', 'Праправнук/праправнучка')
    else label = `Потомок в ${downs}-м поколении`
  } else if (ups === 1 && downs === 1) label = g(sex, 'Брат', 'Сестра', 'Брат/сестра')
  else if (ups === 2 && downs === 1) label = g(sex, 'Дядя', 'Тётя', 'Дядя/тётя')
  else if (ups === 3 && downs === 1) label = g(sex, 'Двоюродный дедушка', 'Двоюродная бабушка', 'Двоюродный дедушка/бабушка')
  else if (ups === 4 && downs === 1) label = g(sex, 'Двоюродный прадедушка', 'Двоюродная прабабушка', 'Двоюродный прадедушка/прабабушка')
  else if (ups === 1 && downs === 2) label = g(sex, 'Племянник', 'Племянница', 'Племянник/племянница')
  else if (ups === 1 && downs === 3) label = g(sex, 'Внучатый племянник', 'Внучатая племянница', 'Внучатый племянник/племянница')
  else if (ups === 1 && downs === 4) label = g(sex, 'Правнучатый племянник', 'Правнучатая племянница', 'Правнучатый племянник/племянница')
  else if (ups >= 2 && downs >= 2) label = cousinName(ups, downs, sex)
  else label = g(sex, 'Дальний родственник', 'Дальняя родственница', 'Дальний родственник')

  return hasSpouse ? `${label} (по браку)` : label
}
