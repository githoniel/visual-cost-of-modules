import React from 'react'
import intl from '@gem-mine/intl'
import { Link, urlFor } from '@gem-mine/durex-router'
import style from './style/index.module.less'

export default function HomeIndex(): JSX.Element {
  return (
    <div className={style.home}>
      <div className={`gm-logo ${style['home-logo']}`} />
      <div className={style['home-content']}>
        {intl.get('welcome')}
        <Link to={urlFor('demo')} className={style['home-link']}>
          ☞
          {intl.get('demo')}
        </Link>
      </div>
    </div>
  )
}
