import React, { useEffect } from 'react'
import prettyBytes from 'pretty-bytes'
import * as echarts from 'echarts/core'
import {
  GraphChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import {
  CanvasRenderer
} from 'echarts/renderers'
import buildData, { EventType } from '@/lib/buildDataForChart'
import { usePM } from '@/page/hook/usePMContext'

// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GraphChart, CanvasRenderer]
)

export default function DepChart({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  const { pm } = usePM()

  useEffect(() => {
    const myChart = echarts.init(document.getElementById('dep-chart')!)
    myChart.showLoading()
    myChart.setOption({
      title: {
        text: 'NPM Dependencies Tree',
      },
      tooltip: {
        formatter(params) {
          if (params.dataType === 'node') {
            return `
              <div><span>name: </span><span>${params.data.pkgName}</span></div>
              <div><span>version: </span><span>${params.data.version}</span></div>
              <div><span>size: </span><span>${prettyBytes(params.data.size)}</span></div>
              <div><span>tarball: </span><span>${params.data.tarball}</span></div>
            `
          } else if (params.dataType === 'edge') {
            return `${params.data.source} -> ${params.data.target}`
          }
          console.dir(params)
        }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: [50, 200]
        },
        draggable: false,
        roam: true,
        // progressiveThreshold: 700,
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          width: 1,
          opacity: 0.7
        }
      }]
    }, true)
    const dataEvent = buildData({
      pm, name, version
    })
    dataEvent.on(EventType.Data, (data) => {
      myChart.hideLoading()
      console.log(data)
      myChart.setOption({
        series: [{
          data: data.nodes,
          links: data.links,
          categories: data.categories,
        }]
      })
    })
  }, [])
  return (<div id="dep-chart" />)
}
