// declare module '*'
declare module 'nuxt'
declare module 'ipfs-api'
declare module 'truffle-contract'

declare module '*.vue' {
  import Vue from 'vue'
  const _default: Vue
  export default _default
}

declare module '*.json' {
  const data: any
  export default data
}
