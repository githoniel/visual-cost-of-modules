import React from 'react'
import { actions } from '@gem-mine/durex'

export default function Error403(): JSX.Element {
  return (
    <div>
      您没有权限访问此页面!
      {}
      <a href="#" onClick={actions.router.goBack}>
        ❮ 返回
      </a>
    </div>
  )
}
