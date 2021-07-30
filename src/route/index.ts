import { router } from '@gem-mine/durex-router'

// 页面组件
import Home from '../page/home'
import NotFound from '../component/status/404'
import Forbidden from '../component/status/403'
import Loading from '../component/status/Loading'

// 路由引入
import demoRoute from './demo'

/**
 * 路由配置，包括：
 *   默认组件配置，例如404，403, loading
 */
router.config({
  components: {
    NotFound,
    Forbidden,
    Loading
  }
})

/**
 * 路由注册
 * path: 必须 {string}，路径
 * component: 可选 {Component}，路由对应的渲染组件
 * permission: 可选 {function}，权限验证函数，无表示不需要权限验证，子路由、平级子模块会继承权限
 * sub: 可选 {array} 子路由
 * index: 可选 {boolean} 是否作为父路由的默认显示
 * module: 可选 {array} 平级子模块
 * redirect: 可选 {string} 跳转到某个路由，不能与 sub 共存
 * exact: 可选 {boolean}是否完全匹配
 */
router.register({
  home: {
    component: Home,
    index: true
  },
  demo: demoRoute
})
