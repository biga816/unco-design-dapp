import { Component, Vue } from 'vue-property-decorator'

// components
import RadarChart from '@/components/RadarChart/index.vue'
import NewUncoDialog from '@/components/NewUncoDialog/index.vue'
import TokenizeDialog from '@/components/TokenizeDialog/index.vue'

// filters
import { unixtimeToDate } from '../../filters'
// interfaces
import { IIpfsData } from '../../interfaces'

@Component({
  // transition: 'bounce',
  filters: {
    unixtimeToDate
  },
  components: {
    RadarChart,
    NewUncoDialog,
    TokenizeDialog
  }
})
export default class History extends Vue {
  public accounts: string[] = []
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
  public activeIndex: number = 0
  public ipfsDataList: IIpfsData[] = []
  public chartData: number[] = []
  public isLastSlide: boolean = false

  private unwatchs: [() => void] = [() => null]

  /**
   *
   *
   * @memberof History
   */
  public mounted(): void {
    // fetch ipfs data
    const networkId = this.$store.state.app.networkId
    const currentIpfsData = this.$store.state.app.currentIpfsData
    if (networkId >= 0 && currentIpfsData) {
      this.fetchIpfsData(currentIpfsData[networkId])
    }
    // chech tx hash
    this.chechTxHash()

    // init swiper setting
    this.initSwiper()

    // watch store
    this.watchStore()
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
  private watchStore(): void {
    this.unwatchs.push(
      // this.$store.watch(
      //   state => state.app.currentIpfsData,
      //   _ => this.fetchIpfsData()
      // ),
      this.$store.watch(
        state => state.app.accounts,
        accounts => (this.accounts = accounts)
      ),
      this.$store.watch(state => state.app.txHash, _ => this.chechTxHash()),
      this.$store.watch(
        state => state.history.ipfsDataList,
        (ipfsDataList: IIpfsData[]) => {
          this.ipfsDataList = ipfsDataList

          if (
            ipfsDataList &&
            ipfsDataList.length > 0 &&
            ipfsDataList[0].hasToken === undefined
          ) {
            this.fetchTokenId(0, ipfsDataList[0].hash)
          }
        }
      ),
      // watch actions
      this.$store.subscribeAction({
        after: (action, state) => {
          if (action.type === 'app/chechTxHash') {
            if (this.ipfsDataList.length === 0) {
              return
            }
            this.fetchTokenId(
              this.activeIndex,
              this.ipfsDataList[this.activeIndex].hash
            )
          } else if (
            action.type === 'app/addFilesToIpfs' ||
            action.type === 'app/fetchAccounts'
          ) {
            const currentIpfsData =
              state.app.currentIpfsData[state.app.networkId]

            this.fetchIpfsData(currentIpfsData)
          }
        }
      })
    )
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

    mySwiper.swiper.on('slideChangeTransitionEnd', () => {
      this.activeIndex = mySwiper.swiper.activeIndex
      if (
        this.ipfsDataList &&
        this.ipfsDataList.length > 0 &&
        this.ipfsDataList[this.activeIndex].hasToken === undefined
      ) {
        this.fetchTokenId(
          this.activeIndex,
          this.ipfsDataList[this.activeIndex].hash
        )
      }
    })

    // set event when reach end
    mySwiper.swiper.on('reachEnd', () => {
      const targetIndex = mySwiper.swiper.slides.length
      const ipfsDataList = this.$store.state.history.ipfsDataList
      const parentHash =
        ipfsDataList && ipfsDataList.length > 0
          ? ipfsDataList[targetIndex - 1].parentHash
          : null

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
   * @memberof History
   */
  private fetchIpfsData(fetchIpfsData: IIpfsData): void {
    if (this.$store.state.app.networkId >= 0) {
      const mySwiper: any = this.$refs.mySwiper
      mySwiper.swiper.slideTo(0)

      // fetch tokenId
      this.ipfsDataList = this.$store.state.history.ipfsDataList
      this.accounts = this.$store.state.app.accounts
      if (this.ipfsDataList && this.ipfsDataList.length > 0) {
        this.fetchTokenId(0, this.ipfsDataList[0].hash)
      }

      // fetch IpfsData
      // this.$store.commit('history/clearIpfsDataList')
      if (fetchIpfsData && fetchIpfsData.hash) {
        this.$store.dispatch('history/fetchIpfsData', {
          hash: fetchIpfsData.hash,
          index: 0
        })
      }

      const ipfsDataList = this.$store.state.history.ipfsDataList
      if (fetchIpfsData && fetchIpfsData.parentHash && !ipfsDataList.length) {
        this.$store.dispatch('history/fetchIpfsData', {
          hash: fetchIpfsData.parentHash,
          index: 1
        })
      }
    }
  }

  /**
   *
   *
   * @private
   * @param {string} txHash
   * @memberof History
   */
  private chechTxHash(): void {
    const networkId = this.$store.state.app.networkId
    const txHash = this.$store.state.app.txHash
    if (
      networkId >= 0 &&
      txHash &&
      txHash[networkId] &&
      txHash[networkId] !== ''
    ) {
      this.$store.dispatch('app/chechTxHash', { txHash: txHash[networkId] })
    }
  }

  /**
   *
   *
   * @private
   * @param {number} index
   * @param {string} tokenUri
   * @memberof History
   */
  private fetchTokenId(index: number, tokenUri: string) {
    const params = { index, tokenUri, account: this.accounts[0] }
    this.$store.dispatch('history/fetchTokenId', params)
  }
}
