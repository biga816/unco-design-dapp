import { Component, Vue } from 'vue-property-decorator'

@Component({
  transition: 'bounce'
})
export default class History extends Vue {
  /**
   *
   *
   * @memberof History
   */
  public mounted(): void {
    const test = this.$store.state.app.ipfsHash
    // console.log(test)
  }
}
