import { describe, expect, it } from 'vitest'
import { formatDayFirst, parseDayFirst } from './dates.js'

describe('formatDayFirst', () => {
  it('shows an ISO date day first', () => {
    expect(formatDayFirst('1982-03-15')).toBe('15/03/1982')
    expect(formatDayFirst('1890-01-01T00:00:00.000Z')).toBe('01/01/1890')
  })

  it('leaves nothing for an empty value or a bare year', () => {
    expect(formatDayFirst('')).toBe('')
    expect(formatDayFirst(null)).toBe('')
    expect(formatDayFirst(1890)).toBe('')
  })
})

describe('parseDayFirst', () => {
  it('reads day, month, year with any common separator', () => {
    expect(parseDayFirst('15/03/1982')).toBe('1982-03-15')
    expect(parseDayFirst('15.03.1982')).toBe('1982-03-15')
    expect(parseDayFirst('1-3-1982')).toBe('1982-03-01')
    expect(parseDayFirst(' 01/03/1982 ')).toBe('1982-03-01')
  })

  it('keeps a pasted ISO date', () => {
    expect(parseDayFirst('1982-03-15')).toBe('1982-03-15')
  })

  it('refuses incomplete and impossible dates', () => {
    expect(parseDayFirst('15/03/198')).toBeNull()
    expect(parseDayFirst('15/03')).toBeNull()
    expect(parseDayFirst('31/02/1982')).toBeNull()
    expect(parseDayFirst('29/02/1900')).toBeNull()
    expect(parseDayFirst('13/13/1982')).toBeNull()
    expect(parseDayFirst('')).toBeNull()
  })

  it('accepts a leap day', () => {
    expect(parseDayFirst('29/02/2000')).toBe('2000-02-29')
  })
})
