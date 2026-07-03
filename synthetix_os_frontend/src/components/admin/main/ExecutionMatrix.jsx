import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactECharts from 'echarts-for-react'
import {
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
  TrendingUp,
  TrendingDown,
  Play,
  Hash,
  RefreshCw
} from 'lucide-react'

import {
  fetchWorkflowExecutionStats,
  selectExecutionSummary,
  selectExecutionDailyStats,
  selectExecutionLoading,
  selectExecutionError
} from '../../../store/slices/workFlowExecutionSlice'

export default function ExecutionMatrix () {
  const dispatch = useDispatch()

  const summary = useSelector(selectExecutionSummary)
  const daily = useSelector(selectExecutionDailyStats)
  const loading = useSelector(selectExecutionLoading)
  const error = useSelector(selectExecutionError)

  useEffect(() => {
    dispatch(fetchWorkflowExecutionStats({ days: 7 }))
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(fetchWorkflowExecutionStats({ days: 7 }))
  }

  const successWidth = Math.min(summary.success_rate || 0, 100)
  const failureWidth = Math.min(summary.failure_rate || 0, 100)

  const trendOptions = useMemo(
    () => ({
      backgroundColor: 'transparent',

      color: ['#34d399', '#f87171', '#60a5fa', '#fbbf24'],

      animationDuration: 600,

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#18181b',
        borderColor: '#3f3f46',
        textStyle: {
          color: '#f4f4f5'
        },
        axisPointer: {
          type: 'shadow'
        }
      },

      legend: {
        top: 0,
        textStyle: {
          color: '#a1a1aa'
        },
        itemWidth: 12,
        itemHeight: 12
      },

      grid: {
        left: 10,
        right: 10,
        top: 55,
        bottom: 10,
        containLabel: true
      },

      xAxis: {
        type: 'category',

        axisLine: {
          lineStyle: {
            color: '#3f3f46'
          }
        },

        axisTick: {
          show: false
        },

        axisLabel: {
          color: '#71717a'
        },

        data: daily.map(d =>
          new Date(d.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        )
      },

      yAxis: [
        {
          type: 'value',

          axisLine: {
            show: false
          },

          axisTick: {
            show: false
          },

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
          min: 0,
          max: 100,

          axisLabel: {
            formatter: '{value}%',
            color: '#71717a'
          },

          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: 'Success',
          type: 'bar',
          stack: 'executions',
          emphasis: {
            focus: 'series'
          },
          barMaxWidth: 40,
          data: daily.map(d => d.success)
        },
        {
          name: 'Failed',
          type: 'bar',
          stack: 'executions',
          emphasis: {
            focus: 'series'
          },
          barMaxWidth: 40,
          data: daily.map(d => d.failed)
        },
        {
          name: 'Running',
          type: 'bar',
          stack: 'executions',
          emphasis: {
            focus: 'series'
          },
          barMaxWidth: 40,
          data: daily.map(d => d.running)
        },
        {
          name: 'Success Rate',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3
          },
          data: daily.map(d => d.success_rate)
        }
      ]
    }),
    [daily]
  )

  const bottomMetrics = [
    {
      label: 'Total Runs',
      value: summary.total.toLocaleString(),
      icon: Hash,
      color: 'text-zinc-400'
    },
    {
      label: 'Successful',
      value: summary.success.toLocaleString(),
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      label: 'Failed',
      value: summary.failed.toLocaleString(),
      icon: TrendingDown,
      color: 'text-red-400'
    },
    {
      label: 'Running',
      value: summary.running.toLocaleString(),
      icon: Play,
      color: 'text-blue-400'
    }
  ]

  return (
    <div className='lg:col-span-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mr-0.5'>
      {/* Header */}

      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-white'>Execution Matrix</h2>

          <p className='mt-1 text-sm text-zinc-500'>
            Global workflow monitoring · last 7 days
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className='rounded-lg border border-zinc-700 p-2 text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <div className='hidden items-center gap-2 sm:flex'>
            <CheckCircle2 size={16} className='text-emerald-400' />
            <span className='text-xs text-zinc-400'>Success</span>
          </div>

          <div className='hidden items-center gap-2 sm:flex'>
            <XCircle size={16} className='text-red-400' />
            <span className='text-xs text-zinc-400'>Failure</span>
          </div>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className='mb-4 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400'>
          {error}
        </div>
      )}

      {/* Rate cards */}

      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Success */}

        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <span className='text-sm font-medium text-zinc-400'>
              Success Rate
            </span>

            <span className='text-emerald-400'>{summary.success_rate}%</span>
          </div>

          <div className='h-3 overflow-hidden rounded-full bg-zinc-800'>
            <div
              className='h-full rounded-full bg-emerald-400 transition-all duration-700'
              style={{ width: `${successWidth}%` }}
            />
          </div>

          <div className='mt-4 text-xs text-zinc-500'>
            {summary.success.toLocaleString()} of{' '}
            {summary.total.toLocaleString()} executions completed successfully.
          </div>
        </div>

        {/* Failure */}

        <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <span className='text-sm font-medium text-zinc-400'>
              Failure Rate
            </span>

            <span className='text-red-400'>{summary.failure_rate}%</span>
          </div>

          <div className='h-3 overflow-hidden rounded-full bg-zinc-800'>
            <div
              className='h-full rounded-full bg-red-400 transition-all duration-700'
              style={{ width: `${failureWidth}%` }}
            />
          </div>

          <div className='mt-4 text-xs text-zinc-500'>
            {summary.failed.toLocaleString()} failed ·{' '}
            {summary.running.toLocaleString()} currently running.
          </div>
        </div>
      </div>

      {/* Daily activity chart */}

      <div className='mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5'>
        <div className='mb-4 flex items-center justify-between'>
          <span className='text-sm font-medium text-zinc-400'>
            Daily Activity
          </span>

          <span className='flex items-center gap-2 text-xs text-emerald-400'>
            <Activity size={12} />
            {daily.length} days
          </span>
        </div>

        {loading && !daily.length ? (
          <div className='flex h-[320px] items-center justify-center'>
            <Loader2 size={20} className='animate-spin text-zinc-600' />
          </div>
        ) : (
          <ReactECharts
            option={trendOptions}
            style={{
              height: '320px',
              width: '100%'
            }}
            notMerge
            lazyUpdate
          />
        )}
      </div>

      {/* Bottom metrics */}

      <div className='mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {bottomMetrics.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className='rounded-xl border border-zinc-800 bg-zinc-950 p-4'
          >
            <div className='mb-3 flex items-center justify-between'>
              <Icon size={16} className={color} />

              <span className='text-xs text-zinc-500'>7d</span>
            </div>

            <div className='text-xl font-bold text-white'>{value}</div>

            <div className='mt-1 text-xs uppercase tracking-wide text-zinc-500'>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
