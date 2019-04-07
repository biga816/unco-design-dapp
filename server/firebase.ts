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
  // Init Nuxt.js
  const nuxt = new Nuxt({
    dev: false,
    buildDir: '.nuxt'
  })

  const app = express.default()
  routing(express.Router(), app)
  app.use(nuxt.render)

  return app
}
