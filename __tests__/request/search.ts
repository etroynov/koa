import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.search=', () => {
  it('should replace the search', () => {
    const ctx = createContext({ url: '/store/shoes' })
    ctx.search = '?page=2&color=blue'
    assert.strictEqual(ctx.url, '/store/shoes?page=2&color=blue')
    assert.strictEqual(ctx.search, '?page=2&color=blue')
  })

  it('should update ctx.querystring and ctx.query', () => {
    const ctx = createContext({ url: '/store/shoes' })
    ctx.search = '?page=2&color=blue'
    assert.strictEqual(ctx.url, '/store/shoes?page=2&color=blue')
    assert.strictEqual(ctx.querystring, 'page=2&color=blue')
    assert.strictEqual(ctx.query.page, '2')
    assert.strictEqual(ctx.query.color, 'blue')
  })

  it('should change .url but not .originalUrl', () => {
    const ctx = createContext({ url: '/store/shoes' })
    ctx.search = '?page=2&color=blue'
    assert.strictEqual(ctx.url, '/store/shoes?page=2&color=blue')
    assert.strictEqual(ctx.originalUrl, '/store/shoes')
    assert.strictEqual(ctx.request.originalUrl, '/store/shoes')
  })

  describe('when missing', () => {
    it('should return ""', () => {
      const ctx = createContext({ url: '/store/shoes' })
      assert.strictEqual(ctx.search, '')
    })
  })
})
