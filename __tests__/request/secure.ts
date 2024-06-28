import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('req.secure', () => {
  it('should return true when encrypted', () => {
    const req = createContext.request()
    req.req.socket = { encrypted: true }
    assert.strictEqual(req.secure, true)
  })
})
