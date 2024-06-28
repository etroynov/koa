import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('res.header', () => {
  it('should return the response header object', () => {
    const res = createContext.response()
    res.set('X-Foo', 'bar')
    assert.deepStrictEqual(res.headers, { 'x-foo': 'bar' })
  })

  describe('when res._headers not present', () => {
    it('should return empty object', () => {
      const res = createContext.response()
      res.res._headers = null
      assert.deepStrictEqual(res.headers, {})
    })
  })
})
