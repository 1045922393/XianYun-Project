﻿export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "全国最大的交友平台上线了",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://github.githubassets.com/favicon.ico"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//at.alicdn.com/t/font_1168872_ehvuah8v57g.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css", "assets/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/element-ui",
    // axios的拦截插件
    "@/plugins/axios"
    //  本地存储的插件
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://157.122.54.189:9095" // 新增axios默认请求路径http://127.0.0.1:1337
    // http://157.122.54.189:9095
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
