import { IpfsService } from '../services/ipfs.service'
import { IIpfsData } from '../interfaces'

const ipfsService = new IpfsService()

/**
 * State
 */
export interface IState {
  ipfsDataList: IIpfsData[]
}

/**
 * Initial State
 */
export const state = (): IState => ({
  ipfsDataList: []
})

/**
 * Actions
 */
export const actions = {
  async fetchIpfsData({ commit }: any, { hash, index }: any) {
    const ipfsData = await ipfsService.getIpfsData(hash)
    commit('fetchIpfsData', { ipfsData, index })
  }
}

/**
 * Mutations
 */
export const mutations = {
  fetchIpfsData(lstate: IState, { ipfsData, index }: any) {
    if (0 <= index) {
      const ipfsDataList = Object.assign([], lstate.ipfsDataList)
      ipfsDataList.splice(index, 0, ipfsData)
      lstate.ipfsDataList = ipfsDataList
    } else {
      lstate.ipfsDataList = [ipfsData].concat(lstate.ipfsDataList)
    }
  },
  clearIpfsDataList(lstate: IState) {
    lstate.ipfsDataList = []
  }
}
