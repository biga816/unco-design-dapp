import { Component, Vue } from 'vue-property-decorator'

// components
import RadarChart from '@/components/RadarChart/RadarChart.vue'
import NewUncoDialog from '@/components/NewUncoDialog/NewUncoDialog.vue'

// filters
import { unixtimeToDate } from '../../filters'
// interfaces
import { IIpfsData } from '../../interfaces'

@Component({
  transition: 'bounce',
  filters: {
    unixtimeToDate
  },
  components: {
    RadarChart,
    NewUncoDialog
  }
})
export default class History extends Vue {
  public swiperOption: any = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 25,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  }
  public ipfsDataList: any = []
  public chartData: number[] = []
  public isLastSlide: boolean = false

  private unwatchs: [() => void] = [() => null]

  /**
   *
   *
   * @memberof History
   */
  public mounted(): void {
    this.fetchIpfsData(this.$store.state.app.currentIpfsData)

    // init swiper setting
    this.initSwiper()

    // watch
    this.unwatchs.push(
      // watch store
      this.$store.watch(
        state => state.app.currentIpfsData,
        currentIpfsData => this.fetchIpfsData(currentIpfsData)
      )
    )
  }

  /**
   *
   *
   * @memberof History
   */
  public destroyed(): void {
    this.$store.commit('history/clearIpfsDataList')
    this.unwatchs.forEach(unwatch => unwatch())
  }

  /**
   *
   *
   * @memberof History
   */
  public slideTo(): void {
    const mySwiper: any = this.$refs.mySwiper

    let taegetIndex = mySwiper.swiper.activeIndex + 1
    if (mySwiper.swiper.slides.length === taegetIndex) {
      taegetIndex = 0
    }

    mySwiper.swiper.slideTo(taegetIndex)
  }

  /**
   *
   *
   * @private
   * @memberof History
   */
  private initSwiper(): void {
    // swiper setting
    const mySwiper: any = this.$refs.mySwiper

    // check if slide is last
    mySwiper.swiper.on('slideChangeTransitionEnd', () => {
      this.isLastSlide =
        mySwiper.swiper.slides.length === mySwiper.swiper.activeIndex + 1
    })

    // set event when reach end
    mySwiper.swiper.on('reachEnd', () => {
      const targetIndex = mySwiper.swiper.slides.length
      const ipfsDataList = this.$store.state.history.ipfsDataList
      const parentHash = ipfsDataList[targetIndex - 1].parentHash

      if (parentHash && parentHash !== '') {
        this.$store.dispatch('history/fetchIpfsData', {
          hash: ipfsDataList[targetIndex - 1].parentHash,
          index: targetIndex
        })
      }
    })
  }

  /**
   *
   *
   * @private
   * @param {string} ipfsHash
   * @memberof History
   */
  private fetchIpfsData(currentIpfsData: IIpfsData): void {
    if (currentIpfsData.hash) {
      this.$store.dispatch('history/fetchIpfsData', {
        hash: currentIpfsData.hash,
        index: 0
      })
    }

    if (currentIpfsData.parentHash) {
      this.$store.dispatch('history/fetchIpfsData', {
        hash: currentIpfsData.parentHash,
        index: 1
      })
    }
  }
}
