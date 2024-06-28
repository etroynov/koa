import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

const { request } = createContext

describe('req.charset', () => {
  describe('with no content-type present', () => {
    it('should return ""', () => {
      const req = request()
      assert(req.charset === '')
    })
  })

  describe('with charset present', () => {
    it('should return ""', () => {
      const req = request()
      req.header['content-type'] = 'text/plain'
      assert(req.charset === '')
    })
  })

  describe('with a charset', () => {
    it('should return the charset', () => {
      const req = request()
      req.header['content-type'] = 'text/plain; charset=utf-8'
      assert.strictEqual(req.charset, 'utf-8')
    })

    it('should return "" if content-type is invalid', () => {
      const req = request()
      req.header['content-type'] = 'application/json; application/text; charset=utf-8'
      assert.strictEqual(req.charset, '')
    })
  })
})
