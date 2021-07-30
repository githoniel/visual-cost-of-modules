import React from 'react'
import { render } from 'react-dom'

import '@/asset/style/index.less'

class App extends React.Component {
  render(): JSX.Element {
    return (
      <div>sadasd</div>
    )
  }
}

render(<App />, document.querySelector('#root'))
