const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',
  srcDir: 'src/',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.scss',
    'vuetify/src/stylus/app.styl',
    'swiper/dist/css/swiper.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    { mode: 'client', src: '@/plugins/swiper.js' },
    { src: '@/plugins/localStorage.js', ssr: false },
    { src: '@/plugins/logger.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~vuetify/src/stylus/settings/_variables.styl']
      }
    },
    vendor: ['vue-awesome-swiper/dist/ssr'],
    watch: [
      'src/filters',
      'src/services',
      'src/interfaces',
      'src/utils'
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(ts)$/,
          loader: 'tslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isDev) {
        config.devtool = '#source-map'
      }
    }
  }
}
