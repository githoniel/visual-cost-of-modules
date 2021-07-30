import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import request from '@sdp.nd/sdp-request'
import style from './style/index.module.less'

@smart((state) => state.demo)
class Request extends React.Component<{
    data: object;
    status: string;
  }> {
  render(): JSX.Element {
    const { data, status } = this.props
    const {
      env, prefix, url, wds
    } = request.demo.setting
    let tip
    if (wds) {
      tip = (
        <span>
          本地请求代理转发，匹配前缀
          {}
          <span className={style.highlight}>{prefix}</span>
          转发到
          {}
          <span className={style.highlight}>
            {url}
          </span>
        </span>
      )
    } else {
      tip = (
        <span className={style.highlight}>
          {url}
          {prefix}
        </span>
      )
    }
    return (
      <div className={style.request}>
        <button className={`${style.button} ${style['request-button']}`} onClick={actions.demo.successGet}>
          get 请求成功
        </button>
        <button className={`${style.button} ${style['request-button']}`} onClick={actions.demo.failureGet}>
          get 请求失败
        </button>
        <button className={`${style.button} ${style['request-button']}`} onClick={actions.demo.loadingGet}>
          请求等待
        </button>
        <button className={`${style.button} ${style['request-button']}`} onClick={actions.demo.successPost}>
          post 请求
        </button>
        <button className={`${style.button} ${style['request-button']}`} onClick={actions.demo.customErrorGet}>
          自定义错误处理
        </button>
        <div className={style['request-box']}>
          状态：
          {status}
        </div>
        <div className={style['request-box']}>
          结果：
          {JSON.stringify(data)}
        </div>
        <div className={style['request-box']}>
          提示：
          <ul>
            <li>
              当前请求环境：
              {}
              <span className={style.highlight}>{env}</span>
            </li>
            <li>
              请求地址：
              {tip}
            </li>
            <li>若要修改环境，请修改 /src/config/request/index.js 文件</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Request
