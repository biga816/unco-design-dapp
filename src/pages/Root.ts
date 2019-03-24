import { Component, Vue } from 'vue-property-decorator'

// components
import PtsCanvas from '@/components/PtsCanvas/index.vue'
import NewUncoDialog from '@/components/NewUncoDialog/index.vue'

@Component({
  // transition: 'bounce',
  components: {
    PtsCanvas,
    NewUncoDialog
  }
})
export default class Root extends Vue {
  public swiperOption: any = { effect: 'flip' }
  public activeIndex: number = 0
  public ipfsHash: string = ''
  public animated: boolean = false

  private unwatchs: [() => void] = [() => null]

  /**
   *
   *
   * @memberof Index
   */
  public mounted(): void {
    // swiper setting
    const mySwiper: any = this.$refs.mySwiper

    mySwiper.swiper.on(
      'slideChangeTransitionEnd',
      () => (this.activeIndex = mySwiper.swiper.activeIndex)
    )

    // watch
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
}
