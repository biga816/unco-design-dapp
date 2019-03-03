import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Default extends Vue {
  public clipped: boolean = false
  public drawer: boolean = false
  public fixed: boolean = false
  public items: object[] = [
    {
      icon: 'apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'bubble_chart',
      title: 'Inspire',
      to: '/inspire'
    }
  ]
  public miniVariant: boolean = false
  public right: boolean = true
  public rightDrawer: boolean = false
  public title: string = 'Vuetify.js'
}
