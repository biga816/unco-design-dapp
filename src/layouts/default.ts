import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Default extends Vue {
  public clipped: boolean = false
  public drawer: boolean = false
  public fixed: boolean = false
  public items: object[] = [
    {
      icon: 'home',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'list',
      title: 'History',
      to: '/history'
    }
  ]
  public miniVariant: boolean = false
  public right: boolean = true
  public rightDrawer: boolean = false
}
