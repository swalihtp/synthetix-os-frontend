import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactECharts from 'echarts-for-react'
import { Activity, Zap, RefreshCw, Loader2 } from 'lucide-react'

import {
  fetchAIUsageDashboard,
  selectAIUsageToday,
  selectAIUsageTrend,
  selectAIUsageLoading,
  selectAIUsageError
} from '../../../store/slices/aiUsageDashboardSlice'

const OPERATION_CONFIG = {
  intent_analysis: {
    label: 'Intent Analysis'
  },
  reply_generation: {
    label: 'Reply Generation'
  },
  embedding: {
    label: 'Embedding'
  }
}

const MODEL_DOTS = [
  'bg-indigo-400',
  'bg-emerald-400',
  'bg-amber-400',
  'bg-blue-400',
  'bg-pink-400',
  'bg-cyan-400'
]

const pct = (value = 0, total = 0) => {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

function StatCard ({ label, value, sub, valueClass = 'text-white' }) {
  return (
    <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-3'>
      <p className='text-[11px] uppercase tracking-wide text-zinc-600'>
        {label}
      </p>

      <div className={`mt-1 text-xl font-bold ${valueClass}`}>
        {(value ?? 0).toLocaleString()}
      </div>

      <p className='mt-1 text-xs text-zinc-500'>{sub}</p>
    </div>
  )
}

export default function AIUsageDashboardPanel () {
  const dispatch = useDispatch()

  const today = useSelector(selectAIUsageToday)
  const trend = useSelector(selectAIUsageTrend)
  const loading = useSelector(selectAIUsageLoading)
  const error = useSelector(selectAIUsageError)

  useEffect(() => {
    dispatch(fetchAIUsageDashboard())
  }, [dispatch])

  const operationChartOptions = useMemo(() => {
    if (!today) return {}

    return {
      backgroundColor: 'transparent',

      color: ['#818cf8', '#34d399', '#fb923c'],

      tooltip: {
        trigger: 'item',
        backgroundColor: '#18181b',
        borderColor: '#3f3f46',
        textStyle: {
          color: '#f4f4f5'
        }
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

          radius: ['58%', '78%'],

          avoidLabelOverlap: true,

          itemStyle: {
            borderColor: '#09090b',
            borderWidth: 3
          },

          label: {
            color: '#d4d4d8',
            formatter: '{b}\n{d}%'
          },

          data: [
            {
              name: 'Intent Analysis',
              value: today.by_operation?.intent_analysis || 0
            },
            {
              name: 'Reply Generation',
              value: today.by_operation?.reply_generation || 0
            },
            {
              name: 'Embedding',
              value: today.by_operation?.embedding || 0
            }
          ]
        }
      ]
    }
  }, [today])

  const trendChartOptions = useMemo(
    () => ({
      backgroundColor: 'transparent',

      color: ['#818cf8'],

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#18181b',
        borderColor: '#3f3f46',
        textStyle: {
          color: '#f4f4f5'
        }
      },

      grid: {
        left: 8,
        right: 8,
        top: 20,
        bottom: 8,
        containLabel: true
      },

      xAxis: {
        type: 'category',

        boundaryGap: false,

        axisLine: {
          lineStyle: {
            color: '#3f3f46'
          }
        },

        axisTick: {
          show: false
        },

        axisLabel: {
          color: '#71717a',
          fontSize: 11
        },

        data: trend.map(day =>
          new Date(day.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        )
      },

      yAxis: {
        type: 'value',

        axisLine: {
          show: false
        },

        axisTick: {
          show: false
        },

        axisLabel: {
          color: '#71717a',
          fontSize: 11
        },

        splitLine: {
          lineStyle: {
            color: '#27272a'
          }
        }
      },

      series: [
        {
          name: 'Total Calls',
          type: 'line',

          smooth: true,

          symbol: 'circle',

          symbolSize: 7,

          lineStyle: {
            width: 3
          },

          areaStyle: {
            opacity: 0.15
          },

          data: trend.map(day => day.total_calls)
        }
      ]
    }),
    [trend]
  )

  return (
    <div className='lg:col-span-4 flex flex-col gap-4 ml-0.5'>
      {/* Main card */}

      <div className='rounded-2xl border border-zinc-800 bg-zinc-900 p-5'>
        {/* Header */}

        <div className='mb-5 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Activity size={18} className='text-zinc-400' />

            <h2 className='text-lg font-semibold text-white'>AI Usage</h2>
          </div>

          <div className='flex items-center gap-2'>
            {today?.date && (
              <span className='text-xs text-zinc-600'>{today.date}</span>
            )}

            <span className='rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400'>
              LIVE
            </span>
          </div>
        </div>

        {/* Loading */}

        {loading && !today && (
          <div className='flex items-center justify-center py-10'>
            <Loader2 size={20} className='animate-spin text-zinc-500' />
          </div>
        )}

        {/* Error */}

        {error && !loading && (
          <div className='mb-4 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400'>
            {error}
          </div>
        )}

        {/* Content */}

        {today && (
          <>
            {/* Stats */}

            <div className='mb-5 grid grid-cols-3 gap-2'>
              <StatCard
                label='Total calls'
                value={today.total_calls}
                sub='today'
              />

              <StatCard
                label='OpenRouter'
                value={today.by_provider?.openrouter}
                sub={`${pct(
                  today.by_provider?.openrouter,
                  today.total_calls
                )}% of total`}
                valueClass='text-indigo-400'
              />

              <StatCard
                label='Gemini'
                value={today.by_provider?.gemini}
                sub={`${pct(
                  today.by_provider?.gemini,
                  today.total_calls
                )}% of total`}
                valueClass='text-emerald-400'
              />
            </div>

            {/* Operations */}

            <div className='mb-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4'>
              <p className='mb-4 text-[11px] uppercase tracking-wide text-zinc-600'>
                By operation
              </p>

              <ReactECharts
                option={operationChartOptions}
                style={{
                  height: '260px',
                  width: '100%'
                }}
                notMerge
                lazyUpdate
              />
            </div>

            {/* Models */}

            {today.by_model?.length > 0 && (
              <>
                <p className='mb-2 text-[11px] uppercase tracking-wide text-zinc-600'>
                  By model
                </p>

                <div className='mb-5 flex flex-wrap gap-2'>
                  {today.by_model.map((model, index) => (
                    <div
                      key={`${model.model_name}-${model.provider}`}
                      className='flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1.5'
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          MODEL_DOTS[index % MODEL_DOTS.length]
                        }`}
                      />

                      <span className='max-w-[120px] truncate text-xs font-medium text-zinc-200'>
                        {model.model_name}
                      </span>

                      <span className='text-zinc-600'>·</span>

                      <span className='text-xs text-zinc-400'>
                        {model.calls.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Trend */}

            {trend.length > 0 && (
              <div className='rounded-xl border border-zinc-800 bg-zinc-950 p-4'>
                <div className='mb-4 flex items-center justify-between'>
                  <p className='text-[11px] uppercase tracking-wide text-zinc-600'>
                    7-day trend
                  </p>

                  <span className='text-xs text-zinc-600'>
                    {trend[0]?.date?.slice(5)} →{' '}
                    {trend[trend.length - 1]?.date?.slice(5)}
                  </span>
                </div>

                <ReactECharts
                  option={trendChartOptions}
                  style={{
                    height: '220px',
                    width: '100%'
                  }}
                  notMerge
                  lazyUpdate
                />
              </div>
            )}
          </>
        )}
      </div>

    </div>
  )
}
