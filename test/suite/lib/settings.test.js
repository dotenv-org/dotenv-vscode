const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')

const settings = require('../../../lib/settings')

describe('settings', function () {
  describe('#workspaceConfig', function () {
    it('returns workspace configuration', function () {
      const result = settings.workspaceConfig()

      assert.strictEqual(typeof result, 'object')
    })
  })

  describe('#autocloakingEnabled', function () {
    it('is true by default', function () {
      const result = settings.autocloakingEnabled()

      assert.equal(result, true)
    })

    it('can be turned on and off', async function () {
      await settings.autocloakingOff()
      let result = settings.autocloakingEnabled()
      assert.equal(result, false)

      await settings.autocloakingOn()
      result = settings.autocloakingEnabled()
      assert.equal(result, true)
    })
  })

  describe('#cloakColor', function () {
    it('is 000000 by default', function () {
      const result = settings.cloakColor()

      assert.equal(result, '#000000')
    })
  })

  describe('#cloakIcon', function () {
    it('is █ by default', function () {
      const result = settings.cloakIcon()

      assert.equal(result, '█')
    })
  })
})
