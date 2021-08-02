/**
  * 相关参数文档请参考
  * https://doc.gem-mine.tech/#/zh-cn/toolkit/api/gms
  */
const { defineConfig } = require('@gem-mine/script')

module.exports = defineConfig({
  showDevEntry: false,
  css: {
    less: {
      lessOptions: {
        always: true
      }
    }
  }
})
