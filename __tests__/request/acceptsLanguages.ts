import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.acceptsLanguages(langs)', () => {
  describe('with no arguments', () => {
    describe('when Accept-Language is populated', () => {
      it('should return accepted types', () => {
        const ctx = createContext()
        ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
        assert.deepStrictEqual(ctx.acceptsLanguages(), ['es', 'pt', 'en'])
      })
    })
  })

  describe('with multiple arguments', () => {
    describe('when Accept-Language is populated', () => {
      describe('if any types types match', () => {
        it('should return the best fit', () => {
          const ctx = createContext()
          ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
          assert.strictEqual(ctx.acceptsLanguages('es', 'en'), 'es')
        })
      })

      describe('if no types match', () => {
        it('should return false', () => {
          const ctx = createContext()
          ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
          assert.strictEqual(ctx.acceptsLanguages('fr', 'au'), false)
        })
      })
    })

    describe('when Accept-Language is not populated', () => {
      it('should return the first type', () => {
        const ctx = createContext()
        assert.strictEqual(ctx.acceptsLanguages('es', 'en'), 'es')
      })
    })
  })

  describe('with an array', () => {
    it('should return the best fit', () => {
      const ctx = createContext()
      ctx.req.headers['accept-language'] = 'en;q=0.8, es, pt'
      assert.strictEqual(ctx.acceptsLanguages(['es', 'en']), 'es')
    })
  })
})
