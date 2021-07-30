/**
  * 相关参数文档请参考
  * https://doc.gem-mine.tech/#/zh-cn/toolkit/api/gms
  */
const { defineConfig } = require('@gem-mine/script')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { proxyConfig } = require('./src/config/request/proxy')

module.exports = defineConfig({
  /**
   * dev模式下注入右下角的开发菜单
   */
  showDevEntry: true,
  /**
   * 本地开发时，需要代理转发的请求
   */
  devServer: {
    proxy: proxyConfig
  },
  chainWebpack(config) {
    // use webpack-chain
    config
      .plugin('define')
      .tap((args) => {
        let sdpEnv
        if (process.env.BUILD_ON_SDP) {
          sdpEnv = 'window.__global_env'
        } else {
          sdpEnv = JSON.stringify(process.env.SDP_ENV)
        }
        args[0]['process.env'].SDP_ENV = sdpEnv
        return args
      })
  },
  configureWebpack: {
    // normal webpack config
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn']
      }),
    ]
  }
})
