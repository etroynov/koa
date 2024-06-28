import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('res.message', () => {
  it('should return the response status message', () => {
    const res = createContext.response()
    res.status = 200
    assert.strictEqual(res.message, 'OK')
  })

  describe('when res.message not present', () => {
    it('should look up in statuses', () => {
      const res = createContext.response()
      res.res.statusCode = 200
      assert.strictEqual(res.message, 'OK')
    })
  })
})

describe('res.message=', () => {
  it('should set response status message', () => {
    const res = createContext.response()
    res.status = 200
    res.message = 'ok'
    assert.strictEqual(res.res.statusMessage, 'ok')
    assert.strictEqual(res.inspect().message, 'ok')
  })
})
