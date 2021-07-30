import React, { Component } from 'react'
import intl from '@gem-mine/intl'
import LANGUAGE from './language'

const locales = {}
Object.keys(LANGUAGE).forEach((key) => {
  // 如果语言包很小，建议全部使用本地化
  // eslint-disable-next-line global-require
  locales[key] = require(`./${key}`)
})

class I18N extends Component<{
  bootstrap?: Function;
  children: JSX.Element;
}> {
  state = {
    initDone: false
  }

  componentDidMount(): void {
    intl.init({ locales }).then(() => {
      if (this.props.bootstrap) {
        this.props.bootstrap()
      }
      this.setState({ initDone: true })
    })
  }

  render(): JSX.Element {
    if (this.state.initDone) {
      return this.props.children
    } else {
      return <></>
    }
  }
}

export default I18N

// formatMessage 和 FormattedMessage 都是为了兼容 react-intl的语法
export const formatMessage = ({ id, defaultMessage }): string => intl.get(id) || defaultMessage

export function FormattedMessage({ id, defaultValue }): string {
  return intl.get(id) || defaultValue || id
}
