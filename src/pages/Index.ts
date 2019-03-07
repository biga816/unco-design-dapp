import { Component, Vue } from 'vue-property-decorator'
import PtsCanvas from '@/components/PtsCanvas/PtsCanvas.vue'
import NewUncoDialog from '@/components/NewUncoDialog/NewUncoDialog.vue'

@Component({
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

  /**
   *
   *
   * @memberof Index
   */
  public mounted(): void {
    const mySwiper: any = this.$refs.mySwiper

    if (!mySwiper || !mySwiper.swiper) {
      return
    }

    mySwiper.swiper.on(
      'slideChangeTransitionEnd',
      () => (this.activeIndex = mySwiper.swiper.activeIndex)
    )
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
  }
}
