import React, { useEffect, useState } from 'react'
import cytoscape from 'cytoscape'

import createGraphEvent from '@/lib/createGraphEvent'
import {
  EventType, GraphLink, GraphNode, GraphNodeScratch
} from '@/lib/BuildDataEvent'
import { usePM } from '@/page/hook/usePMContext'
import { SearchState } from '../header/hook/useSearch'
import Loading from './Loading'
import PkgInfo, { EdgeInfo } from './PkgInfo'

export default function DepGraph({
  name,
  version,
  layoutOption,
  cyInstance,
  setCyInstance
}: {
  name: string,
  version: string,
  layoutOption: Object,
  cyInstance: any,
  setCyInstance: (cy: any) => void
}) {
  const [message, setMessage] = useState('Loading')
  const [status, setStatus] = useState<SearchState>(SearchState.Idle)
  const [info, setInfo] = useState<(GraphNodeScratch & EdgeInfo) | {
    source: string,
    target: string
  }>()

  const { pm } = usePM()
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('dep-graph'),
      elements: {
        nodes: []
      },
      // so we can see the ids
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(id)',
            'font-size': '6px',
            color: '#333',
            // 'text-outline-color': '#888',
            // 'text-outline-width': 1,
            'text-valign': 'center',
            'text-halign': 'right',
            shape: 'ellipse'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': '1',
            'border-color': 'red',
            'border-style': 'solid'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 0.5,
            'line-color': '#ccc',
            'font-size': '6px',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle-backcurve',
            'curve-style': 'bezier',
            'arrow-scale': 0.5
          }
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': 'red',
            width: 1,
          }
        }
      ]
    })
    const event = createGraphEvent({
      pm, name, version
    })
    event
      .onEvent(EventType.Error, (e: Error) => {
        setStatus(SearchState.Fail)
        setMessage(e.stack || e.message)
      })
      .onEvent(EventType.Progress, (data) => {
        setStatus(SearchState.Searching)
        setMessage(`Loading ${data.count} dependencies of the ${data.level + 1} level...`)
      })
      .onEvent(EventType.End, () => {
        setStatus(SearchState.Succ)
        setMessage('Load dependencies done')
        cy.elements().off('click').on('click', (e) => {
          const { target } = e
          if (target.isEdge()) {
            setInfo({
              source: target.source().data().id,
              target: target.target().data().id
            })
          } else if (target.isNode()) {
            const nodeScratch = target.scratch()
            const { id } = target.data()
            const requirePkg: string[] = []
            const requiredByPkg: string[] = []
            target.connectedEdges()
              .forEach((edge) => {
                const sourceId = edge.source().data().id
                const targetId = edge.target().data().id
                if (sourceId === id) {
                  requiredByPkg.push(targetId)
                } else {
                  requirePkg.push(sourceId)
                }
              })
            console.dir(nodeScratch)
            setInfo({
              ...nodeScratch,
              requirePkg,
              requiredByPkg,
            })
          }
        })
      })
      .onEvent(EventType.Data, (data: {
        nodes: GraphNode[]
        edges: GraphLink[]
      }) => {
        cy.add(data)
        cy.layout(layoutOption).run()
      })
    setCyInstance(cy)
    return () => {
      cy.unmount()
      setCyInstance(undefined)
    }
  }, [])

  return (
    <>
      <Loading
        message={message}
        status={status}
      />
      {
        info && (
          <PkgInfo
            info={info}
            cyInstance={cyInstance}
          />
        )
      }
      <div id="dep-graph" />
    </>
  )
}
