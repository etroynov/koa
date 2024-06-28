import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('req.URL', () => {
  it('should not throw when host is void', () => {
    // Accessing the URL should not throw.
    createContext.request().URL // eslint-disable-line no-unused-expressions
  })

  it('should not throw when header.host is invalid', () => {
    const req = createContext.request()
    req.header.host = 'invalid host'
    // Accessing the URL should not throw.
    req.URL // eslint-disable-line no-unused-expressions
  })

  it('should return empty object when invalid', () => {
    const req = createContext.request()
    req.header.host = 'invalid host'
    assert.deepStrictEqual(req.URL, Object.create(null))
  })
})
