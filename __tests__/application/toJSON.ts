import assert from 'node:assert'
import Koa from '../..'

import { describe, it } from '@jest/globals'

describe('app.toJSON()', () => {
  it('should work', () => {
    const app = new Koa()
    const obj = app.toJSON()

    assert.deepStrictEqual({
      subdomainOffset: 2,
      proxy: false,
      env: 'test'
    }, obj)
  })
})
