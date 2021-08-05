import React from 'react'
import DemoChart from './DemoChart'
import DepGraph from './DepGraph'

import './style/content.less'

export default function Content({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  if (!name || !version) {
    return (<DemoChart />)
  } else {
    return (
      <DepGraph
        name={name}
        version={version}
      />
    )
  }
}
