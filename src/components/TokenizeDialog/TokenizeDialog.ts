// libs
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TokenizeDialog extends Vue {
  @Prop()
  public hash!: string
  @Prop()
  public loading!: boolean

  public dialog: boolean = false

  /**
   *
   *
   * @memberof TokenizeDialog
   */
  public mintUnco(): void {
    const accounts = this.$store.state.app.accounts
    const params = {
      hash: this.hash,
      account: accounts[0]
    }
    this.$store.dispatch('app/mintUnco', params)
    this.dialog = false
  }
}
