// libs
import { Component, Vue } from 'vue-property-decorator'
import { format, getTime } from 'date-fns'

@Component
export default class NewUncoDialog extends Vue {
  public dialog: boolean = false

  public date: string = format(new Date(), 'YYYY-MM-DD')
  public time: string = format(new Date(), 'HH:mm')
  public dateDialog: boolean = false
  public timeDialog: boolean = false
  public sound: number = 2
  public sharpness: number = 2
  public smell: number = 2

  public soundLabels: string[] = ['Quiet', '', 'Normal', '', 'Loud']
  public sharpnessLabels: string[] = ['Dull', '', 'Normal', '', 'Sharp']
  public smellLabels: string[] = ['Stink', '', 'Normal', '', 'Elegant']

  /**
   *
   *
   * @memberof NewUncoDialog
   */
  public onSave(): void {
    const params = {
      timestamp: getTime(`${this.date} ${this.time}`) / 1000,
      sound: this.sound,
      sharpness: this.sharpness,
      smell: this.smell
    }
    this.$emit('onSave', params)
    this.dialog = false
  }
}
