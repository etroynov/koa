import Stream from 'node:stream'
import Koa from '../lib/application'

const createContext = (req, res, app) => {
  const socket = new Stream.Duplex()
  req = Object.assign({ headers: {}, socket }, Stream.Readable.prototype, req)
  res = Object.assign({ _headers: {}, socket }, Stream.Writable.prototype, res)
  req.socket.remoteAddress = req.socket.remoteAddress || '127.0.0.1'
  app = app || new Koa()
  res.getHeader = k => res._headers[k.toLowerCase()]
  res.setHeader = (k, v) => { res._headers[k.toLowerCase()] = v }
  res.removeHeader = (k, v) => delete res._headers[k.toLowerCase()]
  return app.createContext(req, res)
}

module.exports = createContext
module.exports.request = (req, res, app) => createContext(req, res, app).request
module.exports.response = (req, res, app) => createContext(req, res, app).response
