import parseurl from 'parseurl'
import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.querystring', () => {
  it('should return the querystring', () => {
    const ctx = createContext({ url: '/store/shoes?page=2&color=blue' })
    assert.strictEqual(ctx.querystring, 'page=2&color=blue')
  })

  describe('when ctx.req not present', () => {
    it('should return an empty string', () => {
      const ctx = createContext()
      ctx.request.req = null
      assert.strictEqual(ctx.querystring, '')
    })
  })
})

describe('ctx.querystring=', () => {
  it('should replace the querystring', () => {
    const ctx = createContext({ url: '/store/shoes' })
    ctx.querystring = 'page=2&color=blue'
    assert.strictEqual(ctx.url, '/store/shoes?page=2&color=blue')
    assert.strictEqual(ctx.querystring, 'page=2&color=blue')
  })

  it('should update ctx.search and ctx.query', () => {
    const ctx = createContext({ url: '/store/shoes' })
    ctx.querystring = 'page=2&color=blue'
    assert.strictEqual(ctx.url, '/store/shoes?page=2&color=blue')
    assert.strictEqual(ctx.search, '?page=2&color=blue')
    assert.strictEqual(ctx.query.page, '2')
    assert.strictEqual(ctx.query.color, 'blue')
  })

  it('should change .url but not .originalUrl', () => {
    const ctx = createContext({ url: '/store/shoes' })
    ctx.querystring = 'page=2&color=blue'
    assert.strictEqual(ctx.url, '/store/shoes?page=2&color=blue')
    assert.strictEqual(ctx.originalUrl, '/store/shoes')
    assert.strictEqual(ctx.request.originalUrl, '/store/shoes')
  })

  it('should not affect parseurl', () => {
    const ctx = createContext({ url: '/login?foo=bar' })
    ctx.querystring = 'foo=bar'
    const url = parseurl(ctx.req)
    assert.strictEqual(url?.path, '/login?foo=bar')
  })
})
