import React from 'react'
import { actions } from '@gem-mine/durex'
import style from './style/index.module.less'

export default function Footer(): JSX.Element {
  return (
    <div className={style.footer}>
      <a href="#" className={style.goback} onClick={actions.router.goBack}>
        ❮ 返回
      </a>
    </div>
  )
}
