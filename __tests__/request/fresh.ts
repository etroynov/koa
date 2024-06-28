import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.fresh', () => {
  describe('the request method is not GET and HEAD', () => {
    it('should return false', () => {
      const ctx = createContext()
      ctx.req.method = 'POST'
      assert.strictEqual(ctx.fresh, false)
    })
  })

  describe('the response is non-2xx', () => {
    it('should return false', () => {
      const ctx = createContext()
      ctx.status = 404
      ctx.req.method = 'GET'
      ctx.req.headers['if-none-match'] = '123'
      ctx.set('ETag', '123')
      assert.strictEqual(ctx.fresh, false)
    })
  })

  describe('the response is 2xx', () => {
    describe('and etag matches', () => {
      it('should return true', () => {
        const ctx = createContext()
        ctx.status = 200
        ctx.req.method = 'GET'
        ctx.req.headers['if-none-match'] = '123'
        ctx.set('ETag', '123')
        assert.strictEqual(ctx.fresh, true)
      })
    })

    describe('and etag does not match', () => {
      it('should return false', () => {
        const ctx = createContext()
        ctx.status = 200
        ctx.req.method = 'GET'
        ctx.req.headers['if-none-match'] = '123'
        ctx.set('ETag', 'hey')
        assert.strictEqual(ctx.fresh, false)
      })
    })
  })
})
