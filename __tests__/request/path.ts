import parseurl from 'parseurl'
import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.path', () => {
  it('should return the pathname', () => {
    const ctx = createContext()
    ctx.url = '/login?next=/dashboard'
    assert.strictEqual(ctx.path, '/login')
  })
})

describe('ctx.path=', () => {
  it('should set the pathname', () => {
    const ctx = createContext()
    ctx.url = '/login?next=/dashboard'

    ctx.path = '/logout'
    assert.strictEqual(ctx.path, '/logout')
    assert.strictEqual(ctx.url, '/logout?next=/dashboard')
  })

  it('should change .url but not .originalUrl', () => {
    const ctx = createContext({ url: '/login' })
    ctx.path = '/logout'
    assert.strictEqual(ctx.url, '/logout')
    assert.strictEqual(ctx.originalUrl, '/login')
    assert.strictEqual(ctx.request.originalUrl, '/login')
  })

  it('should not affect parseurl', () => {
    const ctx = createContext({ url: '/login?foo=bar' })
    ctx.path = '/login'
    const url = parseurl(ctx.req)
    assert.strictEqual(url.path, '/login?foo=bar')
  })
})
