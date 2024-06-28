import Stream from 'node:stream'
import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('res.socket', () => {
  it('should return the request socket object', () => {
    const res = createContext.response()
    assert.strictEqual(res.socket instanceof Stream, true)
  })
})
