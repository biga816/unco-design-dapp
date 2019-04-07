import { TokenController } from './controllers/token-controller'

/**
 *
 *
 * @export
 * @param {*} router
 * @param {*} app
 * @returns {*}
 */
export function routing(router: any, app: any): any {
  const tokenController = new TokenController()

  router.get('/ready', (_: any, res: any) => {
    res.send('All right!! The app is ready:)')
  })

  router.get('/token/:id', tokenController.getToken)

  // route setting
  app.use('/api', router)
}
