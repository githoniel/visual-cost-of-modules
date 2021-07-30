import * as React from 'react'
import { render } from '@gem-mine/durex'

import './config/request'
import './route'
import './config/durex'

import { Router, Routes } from '@gem-mine/durex-router'
import { importAll } from './util/loader'

import I18N from './i18n'
import bootstrap from './config/bootstrap'
import './asset/style/index.less'

importAll(require.context('../src', true, /model(\/.+)?\.(j|t)s$/))

class App extends React.Component {
  render(): JSX.Element {
    return (
      <I18N bootstrap={bootstrap}>
        <Router>
          <Routes />
        </Router>
      </I18N>
    )
  }
}

render(<App />, document.querySelector('#root'))
