import * as express from 'express'
import { Nuxt } from 'nuxt'
import { routing } from './router'

/**
 * init
 *
 * @export
 * @returns {*}
 */
export function init(): any {
  const app = express.default()

  // Init Nuxt.js
  const nuxt = new Nuxt({
    dev: false,
    buildDir: 'ssr'
  })

  routing(express.Router(), app)
  app.use(nuxt.render)

  return app
}
