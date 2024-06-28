import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.remove(name)', () => {
  it('should remove a field', () => {
    const ctx = createContext()
    ctx.set('x-foo', 'bar')
    ctx.remove('x-foo')
    assert.deepStrictEqual(ctx.response.header, {})
  })
})
