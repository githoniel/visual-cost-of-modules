import React from 'react'
import intl from '@gem-mine/intl'
import { Link, urlFor } from '@gem-mine/durex-router'
import style from './style/index.module.less'

class BasicRouter extends React.Component {
  handleChangeLanguage = (e): void => {
    intl.setLocale(e.target.value)
  }

  render(): JSX.Element {
    const { currentLocale } = intl.getLocale()
    return (
      <div className={style.header}>
        <div className={style['header-content']}>
          <div className={`gm-logo ${style['header-logo']}`} />
          <div className={style['header-nav']}>
            <Link className={style['header-nav-item']} to={urlFor('home')}>
              {intl.get('home')}
            </Link>
            <Link className={style['header-nav-item']} to={urlFor('demo')}>
              {intl.get('demo')}
            </Link>
            <select defaultValue={currentLocale} className={style['header-language']} onChange={this.handleChangeLanguage}>
              <option value="zh-CN">中文</option>
              <option value="en">english</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicRouter
