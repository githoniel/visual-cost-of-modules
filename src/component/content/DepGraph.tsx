import React, { useEffect, useState } from 'react'
import cytoscape from 'cytoscape'
import fcose from 'cytoscape-fcose'

import createGraphEvent from '@/lib/createGraphEvent'
import { EventType, GraphLink, GraphNode } from '@/lib/BuildDataEvent'
import { usePM } from '@/page/hook/usePMContext'
import { SearchState } from '../header/hook/useSearch'
import Loading from './Loading'
// import { StellarColor } from './const'

cytoscape.use(fcose)

export default function DepGraph({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  const [message, setMessage] = useState('Loading')
  const [status, setStatus] = useState<SearchState>(SearchState.Idle)

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
            'font-size': '8px',
            'text-valign': 'center',
            'text-halign': 'center',
            shape: 'ellipse'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 1,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle-backcurve',
            'curve-style': 'bezier',
            'arrow-scale': 0.5
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
      })
      .onEvent(EventType.Data, (data: {
        nodes: GraphNode[]
        edges: GraphLink[]
      }) => {
        cy.add(data)
        cy.layout({
          name: 'fcose',
          quality: 'proof',
          nodeSeparation: 200,
          nodeDimensionsIncludeLabels: true,
        }).run()
      })

    cy.nodes().on('click', (e) => {
      console.dir(e)
      console.log(e.target.scratch())
    })

    return () => {
      cy.unmount()
    }
  }, [])

  return (
    <>
      <Loading
        message={message}
        status={status}
      />
      <div id="dep-graph" />
    </>
  )
}
