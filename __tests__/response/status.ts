import assert from 'node:assert'
import request from 'supertest'
import statuses from 'statuses'
import Koa from '../../src/application'
import createContext from '../../test-helpers/context'

import { describe, it, beforeEach } from '@jest/globals'

describe('res.status=', () => {
  describe('when a status code', () => {
    describe('and valid', () => {
      it('should set the status', () => {
        const res = createContext.response()
        res.status = 403
        assert.strictEqual(res.status, 403)
      })

      it('should not throw', () => {
        createContext.response().status = 403
      })
    })

    describe('and invalid', () => {
      it('should throw', () => {
        assert.throws(() => {
          createContext.response().status = 99
        }, /invalid status code: 99/)
      })
    })

    describe('and custom status', () => {
      beforeEach(() => { statuses['700'] = 'custom status' })

      it('should set the status', () => {
        const res = createContext.response()
        res.status = 700
        assert.strictEqual(res.status, 700)
      })

      it('should not throw', () => {
        createContext.response().status = 700
      })
    })

    describe('and HTTP/2', () => {
      it('should not set the status message', () => {
        const res = createContext.response({
          httpVersionMajor: 2,
          httpVersion: '2.0'
        } as any)
        res.status = 200
        assert(!res.res.statusMessage)
      })
    })
  })

  describe('when a status string', () => {
    it('should throw', () => {
      assert.throws(() => { createContext.response().status = 'forbidden' }, /status code must be a number/)
    })
  })

  function strip (status: number) {
    it('should strip content related header fields', async () => {
      const app = new Koa()

      app.use(ctx => {
        ctx.body = { foo: 'bar' }
        ctx.set('Content-Type', 'application/json; charset=utf-8')
        ctx.set('Content-Length', '15')
        ctx.set('Transfer-Encoding', 'chunked')
        ctx.status = status
        assert(ctx.response.header['content-type'] == null)
        assert(ctx.response.header['content-length'] == null)
        assert(ctx.response.header['transfer-encoding'] == null)
      })

      const res = await request(app.callback())
        .get('/')
        .expect(status)

      assert.strictEqual(Object.prototype.hasOwnProperty.call(res.headers, 'Content-Type'), false)
      assert.strictEqual(Object.prototype.hasOwnProperty.call(res.headers, 'content-length'), false)
      assert.strictEqual(Object.prototype.hasOwnProperty.call(res.headers, 'content-encoding'), false)
      assert.strictEqual(res.text.length, 0)
    })

    it('should strip content related header fields after status set', async () => {
      const app = new Koa()

      app.use(ctx => {
        ctx.status = status
        ctx.body = { foo: 'bar' }
        ctx.set('Content-Type', 'application/json; charset=utf-8')
        ctx.set('Content-Length', '15')
        ctx.set('Transfer-Encoding', 'chunked')
      })

      const res = await request(app.callback())
        .get('/')
        .expect(status)

      assert.strictEqual(Object.prototype.hasOwnProperty.call(res.headers, 'Content-Type'), false)
      assert.strictEqual(Object.prototype.hasOwnProperty.call(res.headers, 'content-length'), false)
      assert.strictEqual(Object.prototype.hasOwnProperty.call(res.headers, 'content-encoding'), false)
      assert.strictEqual(res.text.length, 0)
    })
  }

  describe('when 204', () => strip(204))

  describe('when 205', () => strip(205))

  describe('when 304', () => strip(304))
})
