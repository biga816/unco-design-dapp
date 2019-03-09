import Web3 from 'web3'
import { default as contract } from 'truffle-contract'
import { Subject, interval } from 'rxjs'
import { WEB3 } from '.././utils/const'

declare const window: any
declare const ethereum: any

export class Web3Service {
  public ready = false
  public accountsObservable = new Subject<string[]>()
  private web3: any
  private accounts: string[] = []

  /**
   * Creates an instance of Web3Service.
   * @memberof Web3Service
   */
  constructor() {
    window.addEventListener('load', () => {
      this.bootstrapWeb3()
    })
  }

  /**
   *
   *
   * @memberof Web3Service
   */
  public async bootstrapWeb3(): Promise<void> {
    // const networkId = this.route.snapshot.queryParams['networkId'];

    if (window.ethereum) {
      this.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
      } catch (error) {
        // User denied account access...
        throw error
      }
    } else if (typeof window.web3 === 'undefined') {
      // console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      const targetNetwork = WEB3.DEFAULT
      // const targetNetwork = 'http://localhost:8545';
      this.web3 = new Web3(new Web3.providers.HttpProvider(targetNetwork))
    } else {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider)
    }

    this.refreshAccounts()
  }

  /**
   *
   *
   * @param {number} networkId
   * @memberof Web3Service
   */
  public updateWeb3(): boolean {
    if (!window.web3) {
      return false
    }

    const targetHttpProvider = window.web3.currentProvider
    this.web3 = new Web3(targetHttpProvider)

    return true
  }

  /**
   *
   *
   * @returns
   * @memberof Web3Service
   */
  public async getNetworkId() {
    return await this.web3.eth.net.getId((id: number) => id)
  }

  /**
   *
   *
   * @param {any} artifacts
   * @returns
   * @memberof Web3Service
   */
  public async artifactsToContract(artifacts: any): Promise<any> {
    try {
      if (!this.web3) {
        const delay = new Promise(resolve => setTimeout(resolve, 100))
        await delay
        return await this.artifactsToContract(artifacts)
      }

      const contractAbstraction = contract(artifacts)
      contractAbstraction.setProvider(this.web3.currentProvider)
      return await contractAbstraction.deployed()
    } catch (error) {
      throw error
    }
  }

  /**
   *
   *
   * @param {string} txHash
   * @returns {Promise<any>}
   * @memberof Web3Service
   */
  public watchTransactionReceipt(txHash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = interval(500)
        // .take(20)
        .subscribe(
          () => {
            this.web3.eth.getTransactionReceipt(
              txHash,
              (error: any, receipt: any) => {
                if (error) {
                  reject()
                } else {
                  if (receipt.blockNumber > 0) {
                    subscription.unsubscribe()
                    resolve(true)
                  }
                }
              }
            )
          },
          error => reject(error),
          () => resolve(false)
        )
    })
  }

  /**
   *
   *
   * @private
   * @memberof Web3Service
   */
  private refreshAccounts(): void {
    this.web3.eth.getAccounts((error: any, accounts: any[]) => {
      if (error != null) {
        console.warn('There was an error fetching your accounts.')
        return
      }

      // Get the initial account balance so it can be displayed.
      if (accounts.length === 0) {
        console.warn(
          'Could not get any accounts! Make sure your Ethereum client is configured correctly.'
        )
        return
      }

      if (
        !this.accounts ||
        this.accounts.length !== accounts.length ||
        this.accounts[0] !== accounts[0]
      ) {
        this.accountsObservable.next(accounts)
        this.accounts = accounts
      }

      this.ready = true
    })
  }
}
