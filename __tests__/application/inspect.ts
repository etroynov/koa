import util from 'node:util'
import assert from 'node:assert'
import Koa from '../..'

import { describe, it } from '@jest/globals'

const app = new Koa()

describe('app.inspect()', () => {
  it('should work', () => {
    const str = util.inspect(app)
    assert.strictEqual("{ subdomainOffset: 2, proxy: false, env: 'test' }", str)
  })

  it('should return a json representation', () => {
    assert.deepStrictEqual(
      { subdomainOffset: 2, proxy: false, env: 'test' },
      app.inspect()
    )
  })
})
