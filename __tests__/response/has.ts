import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.response.has(name)', () => {
  it('should check a field value, case insensitive way', () => {
    const ctx = createContext()
    ctx.set('X-Foo', '')
    assert.ok(ctx.response.has('x-Foo'))
    assert.ok(ctx.has('x-foo'))
  })

  it('should return false for non-existent header', () => {
    const ctx = createContext()
    assert.strictEqual(ctx.response.has('boo'), false)
    ctx.set('x-foo', 5)
    assert.strictEqual(ctx.has('x-boo'), false)
  })
})
