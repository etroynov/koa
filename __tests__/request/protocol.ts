import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('req.protocol', () => {
  describe('when encrypted', () => {
    it('should return "https"', () => {
      const req = createContext.request()
      req.req.socket = { encrypted: true }
      assert.strictEqual(req.protocol, 'https')
    })
  })

  describe('when unencrypted', () => {
    it('should return "http"', () => {
      const req = createContext.request()
      req.req.socket = {}
      assert.strictEqual(req.protocol, 'http')
    })
  })

  describe('when X-Forwarded-Proto is set', () => {
    describe('and proxy is trusted', () => {
      it('should be used', () => {
        const req = createContext.request()
        req.app.proxy = true
        req.req.socket = {}
        req.header['x-forwarded-proto'] = 'https, http'
        assert.strictEqual(req.protocol, 'https')
      })

      describe('and X-Forwarded-Proto is empty', () => {
        it('should return "http"', () => {
          const req = createContext.request()
          req.app.proxy = true
          req.req.socket = {}
          req.header['x-forwarded-proto'] = ''
          assert.strictEqual(req.protocol, 'http')
        })
      })
    })

    describe('and proxy is not trusted', () => {
      it('should not be used', () => {
        const req = createContext.request()
        req.req.socket = {}
        req.header['x-forwarded-proto'] = 'https, http'
        assert.strictEqual(req.protocol, 'http')
      })
    })
  })
})
