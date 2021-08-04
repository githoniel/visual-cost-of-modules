import React from 'react'
import DemoChart from './DemoChart'
import DepChart from './DepChart'

import './style/content.less'

export default function Content({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  if (name || version) {
    return (<DemoChart />)
  } else {
    return (
      <DepChart
        name={name}
        version={version}
      />
    )
  }
}
