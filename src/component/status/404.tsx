import React from 'react'
import { actions } from '@gem-mine/durex'

export default function Error404(): JSX.Element {
  return (
    <div>
      404 not found!
      {}
      <a href="#" onClick={actions.router.goBack}>
        ❮ 返回
      </a>
    </div>
  )
}
