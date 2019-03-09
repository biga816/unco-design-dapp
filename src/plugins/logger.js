import createLogger from 'vuex/dist/logger';

export default ({store}) => {
  window.onNuxtReady(() => {
    createLogger({})(store)
  })
}