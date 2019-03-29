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
  accounts: string[]
  networkId: number
  currentIpfsData: { [networkId: string]: IIpfsData }
  txHash: { [networkId: string]: string }
  spinner: boolean
}

/**
 * Initial State
 */
export const state = (): IState => ({
  accounts: [],
  networkId: NaN,
  currentIpfsData: {},
  txHash: {},
  spinner: false
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
   * @param {*} { networkId }
   */
  async fetchNetworkId({ commit }: any, { networkId }: any) {
    commit('addNetworkId', { networkId })
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { files }
   */
  async addFilesToIpfs({ commit, dispatch }: any, { files }: any) {
    dispatch('showSpinner', { showSpinner: true })
    const ipfsData = await ipfsService.addFile(files)
    dispatch('showSpinner', { showSpinner: false })
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
    const txHash = result ? result.receipt.transactionHash : ''
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
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { account }
   */
  async fetchCurrentIpfsData({ commit }: any, { account }: any) {
    const uncoCore = await web3Service.artifactsToContract(uncoTokenArtifacts)

    const balance = await uncoCore.balanceOf(account, { from: account })
    if (parseFloat(balance) > 0) {
      const tokenId = await uncoCore.tokenOfOwnerByIndex(
        account,
        parseFloat(balance) - 1,
        {
          from: account
        }
      )
      const tokenUri = await uncoCore.tokenURI(parseFloat(tokenId), {
        from: account
      })

      const ipfsData = await ipfsService.getIpfsData(tokenUri)
      commit('addIpfsData', { ipfsData })
    }
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { showSpinner }
   */
  async showSpinner({ commit }: any, { showSpinner }: any) {
    commit('showSpinner', { showSpinner })
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
   * @param {*} { networkId }
   */
  addNetworkId(lstate: IState, { networkId }: any) {
    lstate.networkId = networkId
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { ipfsData }
   */
  addIpfsData(lstate: IState, { ipfsData }: any) {
    const newIpfsData = Object.assign({}, lstate.currentIpfsData)
    newIpfsData[lstate.networkId] = ipfsData
    lstate.currentIpfsData = newIpfsData
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { txHash }
   */
  addTxHash(lstate: IState, { txHash }: any) {
    const newTxHash = Object.assign({}, lstate.txHash)
    newTxHash[lstate.networkId] = txHash
    lstate.txHash = newTxHash
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { showSpinner }
   */
  showSpinner(lstate: IState, { showSpinner }: any) {
    lstate.spinner = showSpinner
  }
}

/**
 * Getters
 */
export const getters = {
  /**
   *
   *
   * @param {IState} lstate
   * @returns
   */
  txHash(lstate: IState) {
    return lstate.txHash[lstate.networkId]
  }
}
