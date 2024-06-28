import Accept from 'accepts'
import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('ctx.accept', () => {
  it('should return an Accept instance', () => {
    const ctx = createContext()
    ctx.req.headers.accept = 'application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain'
    assert(ctx.accept instanceof Accept)
  })
})

describe('ctx.accept=', () => {
  it('should replace the accept object', () => {
    const ctx = createContext()
    ctx.req.headers.accept = 'text/plain'
    assert.deepStrictEqual(ctx.accepts(), ['text/plain'])

    const request = createContext.request()
    request.req.headers.accept = 'application/*;q=0.2, image/jpeg;q=0.8, text/html, text/plain'
    ctx.accept = Accept(request.req)
    assert.deepStrictEqual(ctx.accepts(), ['text/html', 'text/plain', 'image/jpeg', 'application/*'])
  })
})
