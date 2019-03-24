import { Component, Vue } from 'vue-property-decorator'

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
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.accounts = accounts
      this.$store.dispatch('app/fetchAccounts', { accounts })

      if (accounts && accounts.length > 0) {
        this.$store.dispatch('app/fetchCurrentIpfsData', {
          account: accounts[0]
        })
      }
    })
  }
}
