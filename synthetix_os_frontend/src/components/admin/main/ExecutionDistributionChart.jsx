// ExecutionDistributionChart.jsx

import ReactECharts from 'echarts-for-react'

export default function ExecutionDistributionChart({ summary }) {
  const option = {
    tooltip: {
      trigger: 'item'
    },

    legend: {
      bottom: 0,
      textStyle: {
        color: '#a1a1aa'
      }
    },

    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],

        label: {
          color: '#d4d4d8'
        },

        data: [
          {
            value: summary.success,
            name: 'Success',
            itemStyle: { color: '#34d399' }
          },
          {
            value: summary.failed,
            name: 'Failed',
            itemStyle: { color: '#f87171' }
          },
          {
            value: summary.running,
            name: 'Running',
            itemStyle: { color: '#60a5fa' }
          }
        ]
      }
    ]
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: '320px' }}
    />
  )
}