import assert from 'node:assert'
import util from 'node:util'
import createContext from '../../test-helpers/context'
import context from '../../src/context'

import { describe, it } from '@jest/globals'

describe.skip('ctx.inspect()', () => {
  it('should return a json representation', () => {
    const ctx = createContext()
    const toJSON = ctx.toJSON(ctx)

    assert.deepStrictEqual(toJSON, ctx.inspect())
    assert.deepStrictEqual(util.inspect(toJSON), util.inspect(ctx))
  })

  // console.log(require.cache) will call context.inspect()
  it.skip('should not crash when called on the prototype', () => {
    assert.deepStrictEqual(context, context.inspect())
    assert.deepStrictEqual(util.inspect(context.inspect()), util.inspect(context))
  })
})
