import { useState } from 'react'
import { t } from '../i18n/index.js'
import { formatDayFirst, parseDayFirst } from '../utils/dates.js'

/**
 * Date field typed day first (dd/mm/yyyy), in place of <input type="date">, whose format follows
 * the browser's locale. `value` and `onChange` use ISO dates (yyyy-mm-dd), or '' for no date.
 * Only a complete, real date (or an empty field) reaches onChange; an unfinished one is put back
 * to the last valid value when the field loses focus.
 */
function DateInput({ value, onChange, className, placeholder, ...inputProps }) {
  const [text, setText] = useState(() => formatDayFirst(value))
  const [shownValue, setShownValue] = useState(value)

  // A new value from outside (saved, reset, restored draft) replaces what is shown
  if (value !== shownValue) {
    setShownValue(value)
    setText(formatDayFirst(value))
  }

  const handleChange = (event) => {
    let next = event.target.value.replace(/[^\d/.-]/g, '').slice(0, 10)
    // Typing forward at the end: the separator comes on its own after the day and the month,
    // so a phone's numeric keyboard is enough
    const typedAtEnd = next.length > text.length && event.target.selectionStart >= event.target.value.length
    if (typedAtEnd) {
      // Also after a separator was erased: "15/03" + "1" gives "15/03/1", not "15/031"
      next = next.replace(/^(\d{2})(\d)$/, '$1/$2').replace(/^(\d{1,2}[/.-]\d{2})(\d)$/, '$1/$2')
      if (/^(\d{2}|\d{1,2}[/.-]\d{2})$/.test(next)) next += '/'
    }
    setText(next)

    if (next.trim() === '') {
      onChange('')
      return
    }
    const iso = parseDayFirst(next)
    if (iso) onChange(iso)
  }

  const handleBlur = (event) => {
    if (text.trim() !== '' && !parseDayFirst(text)) setText(formatDayFirst(value))
    inputProps.onBlur?.(event)
  }

  return (
    <input
      {...inputProps}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      maxLength={10}
      className={className}
      value={text}
      placeholder={placeholder || t('jj/mm/aaaa')}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default DateInput
