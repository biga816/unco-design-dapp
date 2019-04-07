import * as express from 'express'
import * as consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import * as bodyParser from 'body-parser'
import cors from 'cors'

import { config } from 'dotenv'
config()

import * as nuxtConfig from '../nuxt.config'
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
  const nuxt = new Nuxt(nuxtConfig)

  // Build only in dev mode
  if (!(process.env.NODE_ENV === 'production')) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // api setting
  app.use(cors())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())

  // Give nuxt middleware to express
  routing(express.Router(), app)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host, () => {
    consola.success(`Server listening on http://${host}:${port}`)
  })
}
start()
