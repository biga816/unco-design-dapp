import { IpfsService } from '../services/ipfs.service'
import { IIpfsData } from '../interfaces'

const ipfsService = new IpfsService()

/**
 * State
 */
export interface IState {
  counter: number
  accounts: string[]
  currentIpfsData: IIpfsData | {}
}

/**
 * Initial State
 */
export const state = (): IState => ({
  counter: 0,
  accounts: [],
  currentIpfsData: {}
})

/**
 * Actions
 */
export const actions = {
  async addFilesToIpfs({ commit }: any, { files }: any) {
    const ipfsData = await ipfsService.addFile(files)
    commit('addIpfsData', { ipfsData })
  }
}

/**
 * Mutations
 */
export const mutations = {
  addAccounts(lstate: IState, { accounts }: any) {
    lstate.accounts = accounts
  },
  addIpfsData(lstate: IState, { ipfsData }: any) {
    lstate.currentIpfsData = ipfsData
  }
}
