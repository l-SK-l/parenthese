import { useEffect, useId, useRef, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { LOCALES, locale, setLocale, t } from '../../i18n/index.js'

// Noms des langues écrits dans leur propre langue : ils ne se traduisent pas.
const NATIVE_NAMES = { fr: 'Français', en: 'English', ru: 'Русский' }

/**
 * Choix de la langue : un seul bouton à la langue courante (« RU »), qui déplie les autres
 * au-dessus de lui. Changer de langue recharge la page (voir i18n/index.js).
 */
function LanguageSwitch({ className = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      // Ferme la liste seulement, pas le menu qui la contient
      event.stopPropagation()
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`pz-lang${open ? ' is-open' : ''} ${className}`.trim()}>
      <button
        ref={buttonRef}
        type="button"
        className="pz-lang-current"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t('Langue')}, ${NATIVE_NAMES[locale]}`}
        title={NATIVE_NAMES[locale]}
        onClick={() => setOpen((value) => !value)}
      >
        {locale.toUpperCase()}
        <ChevronUp size={12} strokeWidth={2.5} aria-hidden="true" />
      </button>
      {open && (
        <div id={listId} className="pz-lang-list pz-menu" role="group" aria-label={t('Langue')}>
          {LOCALES.filter((code) => code !== locale).map((code) => (
            <button key={code} type="button" className="pz-lang-opt pz-menu-item" lang={code} onClick={() => setLocale(code)}>
              <span className="pz-lang-code" aria-hidden="true">{code.toUpperCase()}</span>
              {NATIVE_NAMES[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitch
