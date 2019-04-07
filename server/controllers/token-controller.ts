// import { TokenService } from '../services/token-service'

export class TokenController {
  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {Promise<void>}
   * @memberof TokenController
   */
  public async getToken(req: any, res: any, next: any): Promise<void> {
    try {
      // const tokenService = new TokenService()

      const { id } = req.params
      // const ipfsData = await tokenService.getIpfsData(id)
      const data = {
        name: `UNC #${id}`,
        // attributes: {
        //   No: ipfsData.id,
        //   Creater: ipfsData.creater,
        //   Volume: ipfsData.volume,
        //   Sharpness: ipfsData.sharpness,
        //   Smell: ipfsData.smell,
        //   Timestamp: ipfsData.timestamp
        // },
        image: `${process.env.SERVER_ENV_APP_HOST}img/card.png`
      }
      res.send(data)
    } catch (error) {
      res.sendStatus(500)
      next(error)
    }
  }
}
