import { Component, Vue } from 'vue-property-decorator'

import PtsCanvas from '@/components/PtsCanvas/index.vue'

// interfaces
import { IItem } from '../../interfaces'

// utils
import { SUZURI } from '../../utils/const'

@Component({
  components: {
    PtsCanvas
  }
})
export default class Market extends Vue {
  public swiperOption: any = {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    pagination: {
      el: '.swiper-pagination',
      clickable: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
  public items: IItem[] = SUZURI.ITEMS
  private width: number = 0

  /**
   *
   *
   * @memberof Market
   */
  public mounted(): void {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  /**
   *
   *
   * @private
   * @memberof Market
   */
  private handleResize() {
    this.width = window.innerWidth
    const mySwiper: any = this.$refs.mySwiper
    if (!mySwiper) {
      return
    }

    if (768 >= this.width) {
      mySwiper.swiper.params.slidesPerView = 1
      mySwiper.swiper.params.slidesPerGroup = 1
      mySwiper.swiper.update()
    } else {
      mySwiper.swiper.params.slidesPerView = 3
      mySwiper.swiper.params.slidesPerGroup = 3
      mySwiper.swiper.update()
    }
  }
}
