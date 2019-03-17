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
  ipfsDataList: IIpfsData[]
  tokenBalance: number
}

/**
 * Initial State
 */
export const state = (): IState => ({
  ipfsDataList: [],
  tokenBalance: 0
})

/**
 * Actions
 */
export const actions = {
  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { hash, index }
   */
  async fetchIpfsData({ commit }: any, { hash, index }: any) {
    const ipfsData = await ipfsService.getIpfsData(hash)
    commit('addIpfsData', { ipfsData, index })
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { balance }
   */
  async fetchTokenBalance({ commit }: any, { balance }: any) {
    commit('addTokenBalance', { balance })
  },

  /**
   *
   *
   * @param {*} { commit }
   * @param {*} { tokenUri, account }
   */
  async fetchTokenId({ commit }: any, { index, tokenUri, account }: any) {
    const uncoCore = await web3Service.artifactsToContract(uncoTokenArtifacts)
    const isExist = await uncoCore.isExistTokenUri(tokenUri, { from: account })

    if (isExist) {
      const tokenId = await uncoCore.tokenIdOf(tokenUri, { from: account })
      commit('addTokenId', { index, tokenId: tokenId.toNumber() })
    } else {
      commit('addTokenId', { index })
    }
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
   * @param {*} { ipfsData, index }
   */
  addIpfsData(lstate: IState, { ipfsData, index }: any) {
    if (0 <= index) {
      const ipfsDataList = Object.assign([], lstate.ipfsDataList)
      ipfsDataList.splice(index, 0, ipfsData)
      lstate.ipfsDataList = ipfsDataList
    } else {
      lstate.ipfsDataList = [ipfsData].concat(lstate.ipfsDataList)
    }
  },

  /**
   *
   *
   * @param {IState} lstate
   */
  clearIpfsDataList(lstate: IState) {
    lstate.ipfsDataList = []
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { balance }
   */
  addTokenBalance(lstate: IState, { balance }: any) {
    lstate.tokenBalance = balance
  },

  /**
   *
   *
   * @param {IState} lstate
   * @param {*} { index, tokenId }
   */
  addTokenId(lstate: IState, { index, tokenId }: any) {
    const ipfsDataList: IIpfsData[] = Object.assign([], lstate.ipfsDataList)
    ipfsDataList[index].tokenId = tokenId >= 0 ? tokenId : null
    ipfsDataList[index].hasToken = tokenId >= 0 ? true : false
    lstate.ipfsDataList = ipfsDataList
  }
}
