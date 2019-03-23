/**
 *
 *
 * @export
 * @param {*} router
 * @param {*} app
 * @returns {*}
 */
export function routing(router: any, app: any): any {
  // route setting
  app.use('/', router)

  router.get('/ready', (_: any, res: any) => {
    res.send('All right!! The app is ready:)')
  })
}
