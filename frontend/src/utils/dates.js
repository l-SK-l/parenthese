// Day-first dates (dd/mm/yyyy) for typing and reading, ISO dates (yyyy-mm-dd) for the API.
// Native <input type="date"> follows the browser's own locale, not the page language, so an
// English browser showed mm/dd/yyyy even in the Russian interface.

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/
// Day and month on one or two digits, any of / . - as separator, a four-digit year
const DAY_FIRST = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/

function isRealDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

// "1982-03-15" -> "15/03/1982"; anything that is not a full ISO date -> ""
export function formatDayFirst(value) {
  const match = ISO_DATE.exec(String(value ?? '').slice(0, 10))
  return match ? `${match[3]}/${match[2]}/${match[1]}` : ''
}

// "15/03/1982", "15.03.1982" or "1/3/1982" -> "1982-03-15"; an incomplete or impossible date -> null
export function parseDayFirst(text) {
  const raw = String(text ?? '').trim()
  if (ISO_DATE.test(raw)) {
    const [, y, m, d] = ISO_DATE.exec(raw)
    return isRealDate(Number(y), Number(m), Number(d)) ? raw : null
  }
  const match = DAY_FIRST.exec(raw)
  if (!match) return null
  const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])]
  if (!isRealDate(year, month, day)) return null
  return `${match[3]}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
