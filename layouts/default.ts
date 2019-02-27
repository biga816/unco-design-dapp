import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Default extends Vue {
  clipped: boolean = false
  drawer: boolean = false
  fixed: boolean = false
  items: Object[] = [
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
  miniVariant: boolean = false
  right: boolean = true
  rightDrawer: boolean = false
  title: string = 'Vuetify.js'
}
