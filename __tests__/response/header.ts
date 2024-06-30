import request from 'supertest'
import assert from 'node:assert'
import Koa from '../../src/application'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('res.header', () => {
  it('should return the response header object', () => {
    const res = createContext.response()
    res.set('X-Foo', 'bar')
    res.set('X-Number', 200)
    assert.deepStrictEqual(res.header, { 'x-foo': 'bar', 'x-number': '200' })
  })

  it('should use res.getHeaders() accessor when available', () => {
    const res = createContext.response()
    res.res._headers = null
    res.res.getHeaders = () => ({ 'x-foo': 'baz' })
    assert.deepStrictEqual(res.header, { 'x-foo': 'baz' })
  })

  it('should return the response header object when no mocks are in use', async () => {
    const app = new Koa()
    let header

    app.use(ctx => {
      ctx.set('x-foo', '42')
      header = Object.assign({}, ctx.response.header)
    })

    await request(app.callback())
      .get('/')

    assert.deepStrictEqual(header, { 'x-foo': '42' })
  })

  describe('when res._headers not present', () => {
    it('should return empty object', () => {
      const res = createContext.response()
      res.res._headers = null
      assert.deepStrictEqual(res.header, {})
    })
  })
})
