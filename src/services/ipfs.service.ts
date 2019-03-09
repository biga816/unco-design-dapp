// interfaces
import { IIpfsFile } from '../interfaces'

// utils
import { IPFS } from '../utils/const'

// libs
import { forkJoin } from 'rxjs'
import * as buffer from 'buffer'
import * as ipfsApi from 'ipfs-api'
import axios from 'axios'

export class IpfsService {
  public ipfs: any

  /**
   * Creates an instance of IpfsService.
   * @memberof IpfsService
   */
  constructor() {
    this.ipfs = ipfsApi({
      host: IPFS.HOST,
      port: IPFS.PORT.API,
      protocol: IPFS.PROTOCOL
    })
  }

  /**
   *
   *
   * @param {IFile[]} files
   * @returns
   * @memberof IpfsService
   */
  public async addFile(files: IIpfsFile[]): Promise<any> {
    try {
      // set files for ipfs
      const inputFiles: any = [{ path: '/tmp' }]
      files.forEach((file: IIpfsFile) => {
        inputFiles.push({
          path: `/tmp/${file.path}`,
          content: buffer.Buffer.from(file.data)
        })
      })

      const results = await this.ipfs.files.add(inputFiles)

      // check upload results
      if (results.length !== inputFiles.length) {
        throw new Error('ipfs upload error.')
      }
      const rootData = results[results.length - 1]

      return rootData
    } catch (error) {
      throw error
    }
  }

  /**
   *
   *
   * @param {string} hash
   * @returns {Promise<any>}
   * @memberof IpfsService
   */
  public async getIpfsObjects(hash: string): Promise<any> {
    try {
      const domain = `${IPFS.PROTOCOL}://${IPFS.HOST}:${IPFS.PORT.API}`
      const url = `${domain}/api/v0/${IPFS.API.OBJECT.GET}`
      const result = await axios.get(url, { params: { arg: hash } })

      return result.data['Links']
    } catch (error) {
      throw error
    }
  }

  /**
   *
   *
   * @param {string} hash
   * @returns {Promise<any>}
   * @memberof IpfsService
   */
  public async getIpfsData(hash: string): Promise<any> {
    try {
      // const url = environment.endpoints.ipfs.refUrl + hash + '/data';
      const domain = `${IPFS.PROTOCOL}://${IPFS.HOST}:${IPFS.PORT.GATEWAY}`
      const url = `${domain}/ipfs/${hash}`
      const results = await forkJoin([
        axios.get(url + '/data'),
        axios.get(url + '/parentHash')
      ]).toPromise()

      const ipfsData = {
        data: results[0].data,
        parentHash: results[1].data
      }

      return ipfsData
    } catch (error) {
      throw error
    }
  }
}
