import * as express from 'express'
import * as consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

import * as config from '../nuxt.config'
import { routing } from './router'

/**
 * start
 *
 */
async function start() {
  const app = express.default()
  const host = process.env.HOST || '127.0.0.1'
  const port = Number(process.env.PORT) || 3000

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (!(process.env.NODE_ENV === 'production')) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  routing(express.Router(), app)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host, () => {
    consola.success(`Server listening on http://${host}:${port}`)
  })
}
start()
