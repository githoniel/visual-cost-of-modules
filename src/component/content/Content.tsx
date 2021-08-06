import React, { useState } from 'react'
import { LayoutEnum, LayoutOption } from './const'
import DemoChart from './DemoChart'
import DepGraph from './DepGraph'
import GraphDraw from './Draw'

import './style/content.less'

export default function Content({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  const [layoutOption, setLayoutOption] = useState(LayoutOption[LayoutEnum.FCose])
  const [cyInstance, setCyInstance] = useState()
  return (
    <>
      <GraphDraw
        layoutOption={layoutOption}
        setLayoutOption={setLayoutOption}
        cyInstance={cyInstance}
      />
      {
        name && version ? (
          <DepGraph
            name={name}
            version={version}
            layoutOption={layoutOption}
            setCyInstance={setCyInstance}
          />
        ) : (
          <DemoChart />
        )
      }
    </>
  )
}
