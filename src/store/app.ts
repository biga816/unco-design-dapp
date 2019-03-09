import { IpfsService } from '../services/ipfs.service'

const ipfsService = new IpfsService()

/**
 * State
 */
export interface IState {
  counter: number
  accounts: string[]
  ipfsHash: any
}

/**
 * Initial State
 */
export const state = (): IState => ({
  counter: 0,
  accounts: [],
  ipfsHash: null
})

/**
 * Actions
 */
export const actions = {
  async addFilesToIpfs({ commit }: any, { files }: any) {
    const ipfsFile = await ipfsService.addFile(files)
    commit('addIpfsHash', { ipfsHash: ipfsFile.hash })
  }
}

/**
 * Mutations
 */
export const mutations = {
  increment(lstate: IState) {
    lstate.counter++
  },
  addAccounts(lstate: IState, { accounts }: any) {
    lstate.accounts = accounts
  },
  addIpfsHash(lstate: IState, { ipfsHash }: any) {
    lstate.ipfsHash = ipfsHash
  }
}
