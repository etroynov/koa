import request from 'supertest'
import assert from 'node:assert'
import Koa from '../..'

import { describe, it } from '@jest/globals'

describe('app.context', () => {
  const app1 = new Koa()
  app1.context.msg = 'hello'
  const app2 = new Koa()

  it('should merge properties', () => {
    app1.use((ctx, next) => {
      assert.strictEqual(ctx.msg, 'hello')
      ctx.status = 204
    })

    return request(app1.listen())
      .get('/')
      .expect(204)
  })

  it('should not affect the original prototype', () => {
    app2.use((ctx, next) => {
      assert.strictEqual(ctx.msg, undefined)
      ctx.status = 204
    })

    return request(app2.listen())
      .get('/')
      .expect(204)
  })
})
