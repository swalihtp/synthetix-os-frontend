// ExecutionTrendChart.jsx

import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'

export default function ExecutionTrendChart ({ daily }) {
  const option = useMemo(
    () => ({
      backgroundColor: 'transparent',

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#18181b',
        borderColor: '#3f3f46',
        textStyle: {
          color: '#fff'
        }
      },

      legend: {
        top: 0,
        textStyle: {
          color: '#a1a1aa'
        }
      },

      grid: {
        left: 20,
        right: 20,
        top: 60,
        bottom: 50,
        containLabel: true
      },

      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: '#3f3f46'
          }
        },
        axisLabel: {
          color: '#71717a'
        },
        data: daily.map(item =>
          new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        )
      },

      yAxis: [
        {
          type: 'value',
          name: 'Executions',
          axisLabel: {
            color: '#71717a'
          },
          splitLine: {
            lineStyle: {
              color: '#27272a'
            }
          }
        },
        {
          type: 'value',
          name: 'Success %',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}%',
            color: '#71717a'
          }
        }
      ],

      dataZoom: [
        {
          type: 'inside'
        },
        {
          type: 'slider',
          height: 18,
          borderColor: '#3f3f46'
        }
      ],

      series: [
        {
          name: 'Success',
          type: 'bar',
          stack: 'executions',
          data: daily.map(d => d.success),
          itemStyle: {
            color: '#34d399'
          }
        },
        {
          name: 'Failed',
          type: 'bar',
          stack: 'executions',
          data: daily.map(d => d.failed),
          itemStyle: {
            color: '#f87171'
          }
        },
        {
          name: 'Running',
          type: 'bar',
          stack: 'executions',
          data: daily.map(d => d.running),
          itemStyle: {
            color: '#60a5fa'
          }
        },
        {
          name: 'Success Rate',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: daily.map(d => d.success_rate),
          itemStyle: {
            color: '#fbbf24'
          }
        }
      ]
    }),
    [daily]
  )

  return (
    <ReactECharts
      option={option}
      style={{ height: '420px', width: '100%' }}
      notMerge
      lazyUpdate
    />
  )
}
