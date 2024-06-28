import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.length', () => {
  it('should return length in content-length', () => {
    const req = createContext.request()
    req.header['content-length'] = '10'
    assert.strictEqual(req.length, 10)
  })

  it('should return undefined with no content-length present', () => {
    const req = createContext.request()
    assert.strictEqual(req.length, undefined)
  })
})
