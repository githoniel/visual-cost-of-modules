import React from 'react'
import { render } from 'react-dom'

import Home from '@/page/Home'
import '@/asset/style/index.less'

render(
  <Home />,
  document.querySelector('#root')
)
