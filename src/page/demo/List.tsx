import React from 'react'
import { Link, urlFor } from '@gem-mine/durex-router'
import style from './style/index.module.less'

export default function List(): JSX.Element {
  return (
    <ul className={style.list}>
      <li>
        <Link className={style.link} to={urlFor('demo.simple.counter')}>
          action 使用示例：计数器
        </Link>
      </li>
      <li>
        <Link className={style.link} to={urlFor('demo.simple.router', { id: 233, name: 'robot' })}>
          路由 URL 变量和参数例子
        </Link>
      </li>
      <li>
        <Link className={style.link} to={urlFor('demo.simple.request')}>
          网络请求示例
        </Link>
      </li>
      <li>
        <Link className={style.link} to={urlFor('demo.simple.permission')}>
          权限拦截：计数器需要大于10才能访问
        </Link>
      </li>
      <li>
        <Link className={style.link} to="/demo/not-found">
          404 page (子路由)
        </Link>
      </li>
      <li>
        <Link className={style.link} to="/path/to/not-found">
          404 page (全局)
        </Link>
      </li>
    </ul>
  )
}
