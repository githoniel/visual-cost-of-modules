import React from 'react'
import { Routes } from '@gem-mine/durex-router'
import Header from './Header'
import style from './style/index.module.less'

export default function DemoIndex(): JSX.Element {
  return (
    <div className={style.demo}>
      <Header />
      <div className={style.main}>
        <Routes path="demo" />
      </div>
    </div>
  )
}
