import * as express from 'express'
import * as consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
const app = express.default()

// Import and Set Nuxt.js options
import * as config from '../nuxt.config'
const targetConfig = {
  ...config,
  dev: !(process.env.NODE_ENV === 'production')
}

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (targetConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.success(`Server listening on http://${host}:${port}`)
}
start()
