import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.vary(field)', () => {
  describe('when Vary is not set', () => {
    it('should set it', () => {
      const ctx = createContext()
      ctx.vary('Accept')
      assert.strictEqual(ctx.response.header.vary, 'Accept')
    })
  })

  describe('when Vary is set', () => {
    it('should append', () => {
      const ctx = createContext()
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      assert.strictEqual(ctx.response.header.vary, 'Accept, Accept-Encoding')
    })
  })

  describe('when Vary already contains the value', () => {
    it('should not append', () => {
      const ctx = createContext()
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      assert.strictEqual(ctx.response.header.vary, 'Accept, Accept-Encoding')
    })
  })
})
