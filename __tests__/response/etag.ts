import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('res.etag=', () => {
  it('should not modify an etag with quotes', () => {
    const res = createContext.response()
    res.etag = '"asdf"'
    assert.strictEqual(res.header.etag, '"asdf"')
  })

  it('should not modify a weak etag', () => {
    const res = createContext.response()
    res.etag = 'W/"asdf"'
    assert.strictEqual(res.header.etag, 'W/"asdf"')
  })

  it('should add quotes around an etag if necessary', () => {
    const res = createContext.response()
    res.etag = 'asdf'
    assert.strictEqual(res.header.etag, '"asdf"')
  })
})

describe('res.etag', () => {
  it('should return etag', () => {
    const res = createContext.response()
    res.etag = '"asdf"'
    assert.strictEqual(res.etag, '"asdf"')
  })
})
