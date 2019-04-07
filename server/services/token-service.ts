import axios from 'axios'
import { Web3Util } from '../utils/web3-util'
import { NODE } from '../utils/const'

export class TokenService {
  /**
   *
   *
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof TokenService
   */
  public async getIpfsData(id: string): Promise<any> {
    try {
      const web3Util = new Web3Util()
      const contactAddress = String(process.env.SERVER_ENV_TOKEN_ADDRESS)
      const abi = NODE.ERC20.ABI

      // call contract
      const contract = await web3Util.getContract(abi, contactAddress)
      const hash = await contract.methods.tokenURI(id).call({ from: '' })

      // call ipfs gateway
      const url = process.env.NUXT_ENV_ENDPOINT_IPFS_GATEWAY + hash + '/data'
      const jsonData = await axios.get(url)

      return jsonData.data
    } catch (error) {
      throw error
    }
  }
}
