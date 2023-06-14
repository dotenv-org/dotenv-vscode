const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')

const settings = require('../../../lib/settings')

describe('settings', function () {
  describe('#config', function () {
    it('returns workspace configuration', function () {
      const result = settings.config()

      assert.strictEqual(typeof result, 'object')
    })
  })

  describe('#autocloakingOn', function () {
    it('is true by default', function () {
      const result = settings.autocloakingOn()

      assert.equal(result, true)
    })

    it('can be turned off', function () {

    })
  })
})
