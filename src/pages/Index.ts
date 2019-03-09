import { Component, Vue } from 'vue-property-decorator'
import PtsCanvas from '@/components/PtsCanvas/PtsCanvas.vue'
import NewUncoDialog from '@/components/NewUncoDialog/NewUncoDialog.vue'

// interfaces
import { IIpfsFile } from '../interfaces'

@Component({
  transition: 'bounce',
  components: {
    PtsCanvas,
    NewUncoDialog
  }
})
export default class Index extends Vue {
  public swiperOption: any = {
    // direction: 'vertical',
    effect: 'flip'
  }
  public activeIndex: number = 0
  // public dialog: boolean = false
  public ipfsHash: string | null = null
  public ipfsDataList: IIpfsFile[] = []

  private unwatchs: [() => void] = [() => null]

  /**
   *
   *
   * @memberof Index
   */
  public mounted(): void {
    const mySwiper: any = this.$refs.mySwiper

    mySwiper.swiper.on(
      'slideChangeTransitionEnd',
      () => (this.activeIndex = mySwiper.swiper.activeIndex)
    )

    this.unwatchs.push(
      // watch actions
      this.$store.subscribeAction({
        after: (action, _) => {
          if (action.type === 'app/addFilesToIpfs') {
            this.$router.push('/history')
          }
        }
      })
    )
  }

  /**
   *
   *
   * @memberof Index
   */
  public destroyed(): void {
    this.unwatchs.forEach(unwatch => unwatch())
  }

  /**
   *
   *
   * @memberof Index
   */
  public slideTo(): void {
    const mySwiper: any = this.$refs.mySwiper
    const index = 1 - mySwiper.swiper.activeIndex
    mySwiper.swiper.slideTo(index)
  }

  /**
   *
   *
   * @param {*} event
   * @memberof Index
   */
  public save(event: any): void {
    // save action
    // this.$store.commit('app/increment')

    const targetFiles: IIpfsFile[] = []
    let id: number = 0
    // if (!this.uploadFile) { return; }
    if (this.ipfsDataList && this.ipfsDataList.length > 0) {
      id = this.ipfsDataList[0].data.id + 1
    }

    const data = { id, ...event }

    targetFiles[0] = {
      path: 'data',
      data: JSON.stringify(data)
    }

    if (this.ipfsHash) {
      targetFiles[1] = { path: 'parentHash', data: this.ipfsHash }
    }

    this.$store.dispatch('app/addFilesToIpfs', { files: targetFiles })
    // this.$store.commit('app/increment')
  }
}
