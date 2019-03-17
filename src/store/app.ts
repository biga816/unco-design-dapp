// services
import { IpfsService } from '../services/ipfs.service'
import { Web3Service } from '../services/web3.service'

// contracts
import uncoTokenArtifacts from '../../build/contracts/UncoToken.json'

// interfaces
import { IIpfsData } from '../interfaces'

const ipfsService = new IpfsService()
const web3Service = Web3Service.getInstance()

/**
 * State
 */
export interface IState {
  counter: number
  accounts: string[]
  currentIpfsData: IIpfsData | {}
  txHash: string
}

/**
 * Initial State
 */
export const state = (): IState => ({
  counter: 0,
  accounts: [],
  currentIpfsData: {},
  txHash: ''
})

/**
 * Actions
 */
export const actions = {
  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { accounts }
   */
  async fetchAccounts({ commit }: any, { accounts }: any) {
    commit('addAccounts', { accounts })
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { files }
   */
  async addFilesToIpfs({ commit }: any, { files }: any) {
    const ipfsData = await ipfsService.addFile(files)
    commit('addIpfsData', { ipfsData })
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { hash, account }
   */
  async mintUnco({ commit }: any, { hash, account }: any) {
    const uncoCore = await web3Service.artifactsToContract(uncoTokenArtifacts)
    const result = await uncoCore.mint(hash, { from: account })
    const txHash = result ? result.receipt.transactionHash : null
    commit('addTxHash', { txHash })
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { txHash }
   */
  async chechTxHash({ commit }: any, { txHash }: any) {
    const isComfirmed = await web3Service.watchTransactionReceipt(txHash)
    commit('addTxHash', { txHash: isComfirmed ? '' : txHash })
  }
}

/**
 * Mutations
 */
export const mutations = {
  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { accounts }
   */
  addAccounts(lstate: IState, { accounts }: any) {
    lstate.accounts = accounts
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { ipfsData }
   */
  addIpfsData(lstate: IState, { ipfsData }: any) {
    lstate.currentIpfsData = ipfsData
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { txHash }
   */
  addTxHash(lstate: IState, { txHash }: any) {
    lstate.txHash = txHash
  }
}
