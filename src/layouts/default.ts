import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Default extends Vue {
  public drawer: boolean = false
  public items: object[] = [
    { title: 'Home', to: '/' },
    { title: 'History', to: '/history' }
  ]
  public links: object[] = [
    {
      title: 'GitHub',
      to: 'https://github.com/biga816/unco-design-dapp'
    }
  ]
}
