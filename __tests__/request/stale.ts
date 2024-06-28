import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('req.stale', () => {
  it('should be the inverse of req.fresh', () => {
    const ctx = createContext()
    ctx.status = 200
    ctx.method = 'GET'
    ctx.req.headers['if-none-match'] = '"123"'
    ctx.set('ETag', '"123"')
    assert.strictEqual(ctx.fresh, true)
    assert.strictEqual(ctx.stale, false)
  })
})
