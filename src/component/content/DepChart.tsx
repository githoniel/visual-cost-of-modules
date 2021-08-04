import React, { useEffect } from 'react'
import renderGraph from 'ngraph.pixel'
import createGraph from 'ngraph.graph'
import createSettingsView from 'config.pixel'

import prettyBytes from 'pretty-bytes'

import createGraphEvent from '@/lib/createGraphEvent'
import addCurrentNodeSettings from '@/lib/nodeSetting'
import { EventType, GraphNode } from '@/lib/BuildDataEvent'
import { usePM } from '@/page/hook/usePMContext'
import { StellarColor } from './const'

const FixNodeName = '__fix_node__'

export default function DepChart({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  const { pm } = usePM()

  useEffect(() => {
    const canvas = document.getElementById('dep-chart')
    const cut = createGraph()
    cut.addNode(FixNodeName)
    const renderer = renderGraph(cut, {
      container: canvas,
      node(node) {
        if (node.id === FixNodeName) {
          return { size: 20, color: 0xFF0894 }
        }
        return {
          size: node.data.displaySize,
          color: StellarColor[node.data.depLevel]
        }
      }
    })
    const settingsView = createSettingsView(renderer)
    const gui = settingsView.gui()

    const nodeSettings = addCurrentNodeSettings(gui, renderer)

    renderer.on('nodeclick', showNodeDetails)

    function showNodeDetails(node) {
      const nodeUI = renderer.getNode(node.id)
      nodeSettings.setUI(nodeUI)
    }

    const event = createGraphEvent({
      pm, name: '@gem-mine/cli', version: '2.21.2'
    })
    event.onEvent(EventType.Data, (data: {
      nodes: GraphNode[]
    }) => {
      data.nodes.forEach((node) => {
        console.log(node)
        const g = renderer.graph()
        g.removeNode(FixNodeName)
        g.addNode(node.name, node.data)
        if (node.link) {
          g.addLink(node.link?.source, node.link.target)
        }
      })
    })
  }, [])
  return (<div id="dep-chart" />)
}
