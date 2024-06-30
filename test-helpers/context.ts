import Stream from 'node:stream'
import Koa, { type KoaApplication } from '../src/application'
import type { IncomingMessage, ServerResponse } from 'node:http'

const createContext = (req?: IncomingMessage, res?: ServerResponse, app?: KoaApplication) => {
  const socket = new Stream.Duplex()

  req = Object.assign({ headers: {}, socket }, Stream.Readable.prototype, req)
  res = Object.assign({ _headers: {}, socket }, Stream.Writable.prototype, res)
  // @ts-ignore
  req.socket.remoteAddress = req.socket.remoteAddress || '127.0.0.1'

  // @ts-ignore
  app = app || new Koa()

  // @ts-ignore
  res.getHeader = (k: string) => res._headers[k.toLowerCase()]
  // @ts-ignore
  res.setHeader = (k: string, v: string) => { res._headers[k.toLowerCase()] = v }
  // @ts-ignore
  res.removeHeader = (k: string) => delete res._headers[k.toLowerCase()]

  // @ts-ignore
  return app.createContext(req, res)
}

createContext.request = (req?: IncomingMessage, res?: ServerResponse, app?: KoaApplication) => createContext(req, res, app).request
createContext.response = (req?: IncomingMessage, res?: ServerResponse, app?: KoaApplication) => createContext(req, res, app).response

export default createContext
