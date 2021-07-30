import React from 'react'
import { withRouter, queryString } from '@gem-mine/durex-router'
import style from './style/index.module.less'

@withRouter
class Router extends React.Component {
  render(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = this.props as any
    const { name } = queryString.parse(props.location.search)
    return (
      <div className={style.router}>
        <p>
          针对 URL：/demo/router/
          {}
          <span className={style.highlight}>:id</span>
          ?name=
          {}
          <span className={style.highlight}>value</span>
          {' '}
        </p>
        <ul>
          <li>
            获取到的 search 参数 name 的值为：
            {}
            <span className={style.highlight}>{name}</span>
          </li>
          <li>
            获取到的 url 参数 id 的值为：
            {}
            <span className={style.highlight}>{props.match.params.id}</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Router
