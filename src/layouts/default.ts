import { Component, Vue } from 'vue-property-decorator'
import { ActionPayload } from 'vuex'

// services
import { Web3Service } from '../services/web3.service'

@Component({})
export default class Default extends Vue {
  public drawer: boolean = false
  public items: object[] = [
    { title: 'Home', to: '/' },
    { title: 'History', to: '/history' }
  ]
  public links: object[] = [
    {
      title: 'GitHub',
      to: 'https://github.com/biga816/unco-design-dapp'
    }
  ]
  public accounts: string[] = []
  public networkId: number = NaN
  public spinner: boolean = false
  public snackbar: boolean = false
  public message: string = ''

  private web3Service: Web3Service

  /**
   * Creates an instance of Default.
   * @memberof Default
   */
  constructor() {
    super()
    this.web3Service = new Web3Service()
  }

  /**
   *
   *
   * @memberof Default
   */
  public mounted(): void {
    this.web3Service.accountsObservable.subscribe(async accounts => {
      this.accounts = accounts
      this.networkId = await this.web3Service.getNetworkId()
      this.$store.dispatch('app/fetchNetworkId', { networkId: this.networkId })
      this.$store.dispatch('app/fetchAccounts', { accounts })
      // this.$store.dispatch('app/showSpinner', { showSpinner: false })

      if (accounts && accounts.length > 0) {
        this.$store.dispatch('app/fetchCurrentIpfsData', {
          account: accounts[0]
        })
      }
    })

    // this.$store.watch(
    //   state => state.app.spinner,
    //   spinner => (this.spinner = spinner)
    // )

    this.$store.subscribeAction({
      after: (action: ActionPayload, state: any) => {
        if (action.type === 'app/showSpinner') {
          this.spinner = state.app.spinner
        } else if (action.type === 'app/showSnackbar') {
          this.message = state.app.snackbar
          this.snackbar = true
        }
      }
    })
  }

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof Default
   */
  public get networkName(): string {
    switch (this.networkId) {
      case 1:
        return ''
      case 3:
        return 'on ropsten'
      case 4:
        return 'on rinkeby'
      case 42:
        return 'on kovan'
      default:
        return 'on'
    }
  }
}
