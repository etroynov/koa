import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

const { request } = createContext

describe('req.header', () => {
  it('should return the request header object', () => {
    const req = request()
    assert.deepStrictEqual(req.header, req.req.headers)
  })

  it('should set the request header object', () => {
    const req = request()
    req.header = { 'X-Custom-Headerfield': 'Its one header, with headerfields' }
    assert.deepStrictEqual(req.header, req.req.headers)
  })
})
