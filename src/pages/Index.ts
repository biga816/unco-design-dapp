import { Component, Vue } from 'vue-property-decorator'
// import PtsCanvas from '@/components/PtsCanvas/PtsCanvas.vue'

// libs
// import { swiper, swiperSlide } from 'vue-awesome-swiper/dist/ssr'

@Component({
  components: {
    PtsCanvas: () => import('@/components/PtsCanvas/PtsCanvas.vue')
    // swiper,
    // swiperSlide
  }
})
export default class Index extends Vue {
  public swiperOption: any = {
    // direction: 'vertical',
    effect: 'flip',
    grabCursor: false,
    pagination: {
      // el: '.swiper-pagination',
      // clickable: true,
    }
  }
  public activeIndex: number = 0

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
  public slideTo() {
    const mySwiper: any = this.$refs.mySwiper
    const index = 1 - mySwiper.swiper.activeIndex
    mySwiper.swiper.slideTo(index)
  }
}
