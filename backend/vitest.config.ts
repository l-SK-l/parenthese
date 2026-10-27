import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // A sign-up code in the local backend/.env must not leak into the tests: dotenv keeps variables that are
    // already set, and the tests that need a code set it themselves
    env: { REGISTRATION_CODE: '' },
  },
})
