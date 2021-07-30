import durex from '@gem-mine/durex'
import router from '@gem-mine/durex-router'

durex.defaults({
  reducers: {},
  middlewares: []
})
// 路由模式，默认 hash，可选 browser，采用 history 模式，需要服务端支持
router.config('hash')
