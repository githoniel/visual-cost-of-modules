import React, { useState } from 'react'
import { LayoutEnum, LayoutOption } from './const'
import Nothing from './Nothing'
import DepGraph from './DepGraph'
import GraphDraw from './Draw'

import './style/content.less'
import useForceUpdate from './hook/useForceUpdate'

export default function Content({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  const [layoutOption, setLayoutOption] = useState(LayoutOption[LayoutEnum.Cola])
  const [fixedSize, setFixedSize] = useState(false)
  const [cyInstance, setCyInstance] = useState()
  const {
    updateFlag,
    forceUpdate
  } = useForceUpdate()

  return (
    <>
      <GraphDraw
        layoutOption={layoutOption}
        setLayoutOption={setLayoutOption}
        cyInstance={cyInstance}
        setFixedSize={setFixedSize}
        forceUpdate={forceUpdate}
      />
      {
        name && version ? (
          <DepGraph
            key={updateFlag}
            name={name}
            version={version}
            fixedSize={fixedSize}
            layoutOption={layoutOption}
            cyInstance={cyInstance}
            setCyInstance={setCyInstance}
          />
        ) : (
          <Nothing />
        )
      }
    </>
  )
}
