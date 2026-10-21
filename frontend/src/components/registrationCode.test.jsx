import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import AccountDashboard from './AccountDashboard.jsx'

// REGISTRATION_CODE: /auth/options says registrationCodeRequired, App passes it down, and only the
// sign-up form asks for the code.
const noop = () => {}
const props = { authenticated: false, trees: [], onLogin: noop, onRegister: noop, onBackToAccess: noop }
const render = (extra) => renderToStaticMarkup(<AccountDashboard {...props} {...extra} />)

describe('sign-up code field', () => {
  it('shows on the sign-up form when the instance asks for a code', () => {
    expect(render({ defaultMode: 'register', registrationCodeRequired: true })).toContain('id="accountRegistrationCode"')
  })

  it('stays hidden without a code, on the login form, and when registration is closed', () => {
    expect(render({ defaultMode: 'register' })).not.toContain('accountRegistrationCode')
    expect(render({ defaultMode: 'login', registrationCodeRequired: true })).not.toContain('accountRegistrationCode')
    expect(render({ defaultMode: 'register', registrationCodeRequired: true, canRegister: false })).not.toContain('accountRegistrationCode')
  })
})
