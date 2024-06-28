import assert from 'node:assert'
import context from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.assert(value, status)', () => {
  it('should throw an error', () => {
    const ctx = context()

    try {
      ctx.assert(false, 404)
      throw new Error('asdf')
    } catch (err) {
      assert.strictEqual(err.status, 404)
      assert.strictEqual(err.expose, true)
    }
  })
})
