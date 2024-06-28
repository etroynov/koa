import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

const { request } = createContext

describe('ctx.idempotent', () => {
  describe('when the request method is idempotent', () => {
    it('should return true', () => {
      ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'].forEach(check)
      function check (method) {
        const req = request()
        req.method = method
        assert.strictEqual(req.idempotent, true)
      }
    })
  })

  describe('when the request method is not idempotent', () => {
    it('should return false', () => {
      const req = request()
      req.method = 'POST'
      assert.strictEqual(req.idempotent, false)
    })
  })
})
