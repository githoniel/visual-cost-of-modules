import React from 'react'
import { urlFor, Link } from '@gem-mine/durex-router'
import style from '../style/index.module.less'

export default function One(): JSX.Element {
  return (
    <div>
      <span>恭喜你，有权限访问此页面！ </span>
      <Link className={style.link} to={urlFor('demo.simple.permission.two')}>
        再访问个有权限的页面
      </Link>
    </div>
  )
}
