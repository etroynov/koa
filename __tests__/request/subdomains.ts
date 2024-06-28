import assert from 'node:assert'
import createContext from '../../test-helpers/context'

import { describe, it } from '@jest/globals'

describe('req.subdomains', () => {
  it('should return subdomain array', () => {
    const req = createContext.request()
    req.header.host = 'tobi.ferrets.example.com'
    req.app.subdomainOffset = 2
    assert.deepStrictEqual(req.subdomains, ['ferrets', 'tobi'])

    req.app.subdomainOffset = 3
    assert.deepStrictEqual(req.subdomains, ['tobi'])
  })

  it('should work with no host present', () => {
    const req = createContext.request()
    assert.deepStrictEqual(req.subdomains, [])
  })

  it('should check if the host is an ip address, even with a port', () => {
    const req = createContext.request()
    req.header.host = '127.0.0.1:3000'
    assert.deepStrictEqual(req.subdomains, [])
  })
})
