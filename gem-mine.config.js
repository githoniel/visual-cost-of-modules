/**
  * 相关参数文档请参考
  * https://doc.gem-mine.tech/#/zh-cn/toolkit/api/gms
  */
const { defineConfig } = require('@gem-mine/script')

module.exports = defineConfig({
  showDevEntry: false,
  publicPath: '/visual-cost-of-modules/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          math: 'always'
        }
      }
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('exdat', 'exdat/build/dat.gui')
  }
})
