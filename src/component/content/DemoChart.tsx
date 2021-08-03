import React, { useEffect } from 'react'

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

// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GraphChart, CanvasRenderer]
)

export default function DemoChart() {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('demo-chart')!)
    myChart.showLoading()
    import('./data/demoChart.json')
      .then((json) => {
        myChart.hideLoading()
        myChart.setOption({
          title: {
            text: 'NPM Dependencies Tree',
          },
          tooltip: {
            formatter(params) {
              if (params.dataType === 'node') {
                return `${params.data.name}: ${params.data.symbolSize}`
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
            layout: 'none',
            force: {
              repulsion: 100
            },
            draggable: false,
            roam: true,
            // progressiveThreshold: 700,
            data: json.nodes,
            links: json.links,
            categories: json.categories,
            emphasis: {
              focus: 'adjacency',
              label: {
                position: 'right',
                show: true
              }
            },
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              width: 0.5,
              curveness: 0.3,
              opacity: 0.7
            }
          }]
        }, true)
      })
    return myChart.dispose()
  }, [])
  return (<div id="demo-chart" />)
}
