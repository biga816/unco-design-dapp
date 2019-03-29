// libs
import { Component, Prop, Vue } from 'vue-property-decorator'
import { format, getTime } from 'date-fns'

// interfaces
import { IIpfsFile } from '../../interfaces'

@Component
export default class NewUncoDialog extends Vue {
  @Prop()
  public btnColor!: string

  public dialog: boolean = false
  public date: string = format(new Date(), 'YYYY-MM-DD')
  public time: string = format(new Date(), 'HH:mm')
  public dateDialog: boolean = false
  public timeDialog: boolean = false
  public volume: number = 2
  public sharpness: number = 2
  public smell: number = 2

  public volumeLabels: string[] = ['Small', '', 'Normal', '', 'Large']
  public sharpnessLabels: string[] = ['Dull', '', 'Normal', '', 'Sharp']
  public smellLabels: string[] = ['Stink', '', 'Normal', '', 'Elegant']

  /**
   *
   *
   * @memberof NewUncoDialog
   */
  public save(): void {
    // set id & parentHash
    const networkId = this.$store.state.app.networkId
    const currentIpfsData = this.$store.state.app.currentIpfsData

    let id = 0
    let parentHash = ''

    if (
      networkId >= 0 &&
      currentIpfsData[networkId] &&
      currentIpfsData[networkId].data
    ) {
      id = currentIpfsData[networkId].data.id + 1
      parentHash = currentIpfsData[networkId].hash
    }

    // set data
    const data = {
      id,
      timestamp: getTime(`${this.date} ${this.time}`) / 1000,
      volume: this.volume,
      sharpness: this.sharpness,
      smell: this.smell
    }

    // set targetFiles
    const targetFiles: IIpfsFile[] = []

    targetFiles[0] = {
      path: 'data',
      data: JSON.stringify(data)
    }

    targetFiles[1] = { path: 'parentHash', data: parentHash }

    this.$store.dispatch('app/addFilesToIpfs', { files: targetFiles })
    this.dialog = false
  }
}
