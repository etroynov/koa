import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('req.type', () => {
  it('should return type void of parameters', () => {
    const req = createContext.request()
    req.header['content-type'] = 'text/html; charset=utf-8'
    assert.strictEqual(req.type, 'text/html')
  })

  it('should return empty string with no host present', () => {
    const req = createContext.request()
    assert.strictEqual(req.type, '')
  })
})
