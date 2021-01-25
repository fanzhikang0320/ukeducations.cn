
const Webpack = require('webpack');
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '英国留学指南',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: ' UK Educations将帮助您找到适合您孩子的最佳英国学校，该站点搜索功能使您可以轻松地找到适合的学校，可按位置，寄宿类型，学生年龄（5-18），学校类型，A-Level和IB结果，学生人数，寄宿生人数，SEN（ 特殊教育需求）条款，EAL（英语作为其他语言）条款和费用等进行检索。' },
      { hid: 'keyword', name: 'keyword', content: '英国学校,英国留学, 低龄留学, 初中, 高中, 英国学制留学,留学指南,学校,指南'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/reset.scss'
  ],
  router: {
    prefetchLinks: false,
    linkExactActiveClass: 'exact-active-link'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/ant-ui',
      ssr: true
    }
  ],
  // Loading
  loading: {
    color: '#318FF3'
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  
  styleResources: {
    scss: './assets/scss/variables.scss',
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    
    plugins: [
      new Webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ],
    postcss: [
      require('postcss-px2rem')({
        remUnit: 100
      })
    ],
    vendor: ['axios','ant-design-vue'],
   
    babel: {
      plugins: [
        ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
      ]
    },
    transpile: [/^ant-design-vue/]
  },
  axios: {
    baseURL: ''
  },
  server: {
    port: '8888',
    host: '127.0.0.1'
  }
}
