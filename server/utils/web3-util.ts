// libs
import Web3 from 'web3'

/**
 *
 *
 * @export
 * @class Web3Util
 */
export class Web3Util {
  private web3: any

  /**
   * Creates an instance of Web3Util.
   * @memberof Web3Util
   */
  constructor() {
    this.connect()
  }

  /**
   * Get contract
   *
   * @param {*} abi
   * @param {string} contractAddress
   * @returns {Promise<any>}
   * @memberof Web3Util
   */
  public async getContract(abi: any, contractAddress: string): Promise<any> {
    // get contract
    return new this.web3.eth.Contract(abi, contractAddress)
  }

  /**
   * Connect
   *
   * @private
   * @memberof Web3Util
   */
  private connect(): void {
    const targetNetwork = String(process.env.SERVER_ENV_WEB3_HOST)
    const provider = new Web3.providers.HttpProvider(targetNetwork)
    this.web3 = new Web3(provider)
  }
}
