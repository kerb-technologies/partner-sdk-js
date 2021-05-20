const partner = require('../dist/index.js')

// check  KERB_PARTNER_HOST
const ok = typeof process.env.KERB_PARTNER_HOST === 'string'
if (!ok) {
  throw new Error(
    'You didnt provide KERB_PARTNER_HOST at env, test will be stop'
  )
}

describe('Partner test', () => {
  test('this valid test', () => {
    expect('string').toBe('string')
  })
})
