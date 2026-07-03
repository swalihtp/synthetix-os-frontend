import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CheckCircle2,
  Clock,
  XCircle,
  SkipForward,
  Terminal,
  AlertCircle
} from 'lucide-react'

import {
  fetchEmailActivityStream,
  selectActivities,
  selectActivityLoading,
  selectActivityError,
  selectActivityFilters,
  selectActivityCounts,
  selectAvgConfidence,
  selectActiveAgents,
  setResultFilter,
  setAgentFilter
} from '../../../store/slices/emailActivityStreamSlice'

// ─── Config ───────────────────────────────────────────────────────────────────

const RESULT_CONFIG = {
  AUTO_RESOLVED: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    label: 'AUTO RESOLVED'
  },
  HUMAN_REVIEW: {
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    label: 'HUMAN REVIEW'
  },
  SKIPPED: {
    icon: SkipForward,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    label: 'SKIPPED'
  },
  FAILED: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    label: 'FAILED'
  }
}

const DEFAULT_CONFIG = {
  icon: AlertCircle,
  color: 'text-zinc-500',
  bg: 'bg-zinc-800',
  label: 'UNKNOWN'
}

const WF_STATUS_BADGE = {
  RUNNING: 'text-blue-400 bg-blue-500/10',
  SUCCESS: 'text-emerald-400 bg-emerald-500/10',
  FAILED: 'text-red-400 bg-red-500/10'
}

// ─── Filter options ───────────────────────────────────────────────────────────

const RESULT_FILTERS = [
  { label: 'All', value: null },
  { label: 'Auto resolved', value: 'AUTO_RESOLVED' },
  { label: 'Human review', value: 'HUMAN_REVIEW' },
  { label: 'Skipped', value: 'SKIPPED' },
  { label: 'Failed', value: 'FAILED' }
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime (isoString) {
  if (!isoString) return '--:--:--'
  return new Date(isoString).toTimeString().slice(0, 8)
}

function buildMessage (activity) {
  if (activity.original_subject) return activity.original_subject
  if (activity.detected_intent) return activity.detected_intent
  if (activity.sender) return `From: ${activity.sender}`
  return 'No subject'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatsStrip ({ counts, avgConfidence }) {
  const total = Object.values(counts).reduce((s, n) => s + n, 0)
  const stats = [
    { label: 'Total', value: total, color: 'text-white' },
    {
      label: 'Auto resolved',
      value: counts.AUTO_RESOLVED,
      color: 'text-emerald-400'
    },
    {
      label: 'Human review',
      value: counts.HUMAN_REVIEW,
      color: 'text-yellow-400'
    },
    { label: 'Failed', value: counts.FAILED, color: 'text-red-400' },
    {
      label: 'Avg confidence',
      value:
        avgConfidence != null ? `${Math.round(avgConfidence * 100)}%` : '—',
      color: 'text-indigo-400'
    }
  ]
  return (
    <div className='flex border-b border-zinc-800 divide-x divide-zinc-800'>
      {stats.map(s => (
        <div
          key={s.label}
          className='flex flex-col items-center px-4 py-2 flex-1'
        >
          <span className={`text-sm font-bold tabular-nums ${s.color}`}>
            {s.value}
          </span>
          <span className='text-[10px] text-zinc-500 mt-0.5 whitespace-nowrap'>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function FilterBar ({ filters, agents, dispatch }) {
  return (
    <div className='border-b border-zinc-800'>
      {/* Result filters */}
      <div className='flex gap-2 px-4 py-2.5 overflow-x-auto'>
        {RESULT_FILTERS.map(opt => (
          <button
            key={String(opt.value)}
            onClick={() => dispatch(setResultFilter(opt.value))}
            className={`
              whitespace-nowrap text-xs font-semibold px-3 py-1 rounded-md border
              transition-all duration-150 shrink-0
              ${
                filters.result === opt.value
                  ? 'bg-zinc-800 border-zinc-600 text-white'
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Agent filter — only rendered when multiple agents are present */}
      {agents.length > 1 && (
        <div className='flex items-center gap-2 px-4 pb-2.5'>
          <span className='text-[11px] text-zinc-600 shrink-0'>Agent</span>
          <select
            value={filters.agentId ?? ''}
            onChange={e => dispatch(setAgentFilter(e.target.value || null))}
            className='
              flex-1 text-xs bg-zinc-950 border border-zinc-800 rounded-md
              px-2 py-1 text-zinc-300 focus:outline-none focus:border-zinc-600
            '
          >
            <option value=''>All agents</option>
            {agents.map(a => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

function LogRow ({ activity }) {
  const config = RESULT_CONFIG[activity.result] ?? DEFAULT_CONFIG
  const Icon = config.icon
  const wf = activity.workflow_execution
  const conf =
    activity.confidence_score != null
      ? `${Math.round(activity.confidence_score * 100)}%`
      : null

  return (
    <div
      className='
      group flex items-start gap-3
      rounded-xl border border-zinc-800 bg-zinc-950 p-3
      transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900
    '
    >
      {/* Result icon */}
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${config.bg}`}
      >
        <Icon size={16} className={config.color} />
      </div>

      {/* Content */}
      <div className='min-w-0 flex-1'>
        {/* Row 1: result label + time + confidence */}
        <div className='mb-0.5 flex items-center gap-2 flex-wrap'>
          <span className={`text-xs font-semibold ${config.color}`}>
            {config.label}
          </span>
          <span className='text-xs text-zinc-500'>
            {formatTime(activity.processed_at)}
          </span>
          {conf && (
            <span className='ml-auto text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded'>
              {conf}
            </span>
          )}
        </div>

        {/* Row 2: subject / intent */}
        <p className='truncate text-sm text-zinc-300 mb-1'>
          {buildMessage(activity)}
        </p>

        {/* Row 3: agent · sender · workflow · wf status · review_reason */}
        <div className='flex items-center gap-2 flex-wrap'>
          {activity.agent && (
            <span className='text-[11px] font-semibold text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded'>
              {activity.agent.name}
            </span>
          )}

          {activity.sender && (
            <span className='text-[11px] text-zinc-500 truncate max-w-[160px]'>
              {activity.sender}
            </span>
          )}

          {wf?.workflow && (
            <>
              <span className='text-zinc-700'>·</span>
              <span className='text-[11px] text-zinc-600 truncate max-w-[140px]'>
                {wf.workflow.name}
              </span>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  WF_STATUS_BADGE[wf.status] ?? 'text-zinc-500 bg-zinc-800'
                }`}
              >
                {wf.status}
              </span>
            </>
          )}

          {activity.review_reason && (
            <span className='text-[11px] text-yellow-600 truncate ml-auto'>
              {activity.review_reason}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminActivityStream () {
  const dispatch = useDispatch()
  const activities = useSelector(selectActivities)
  const loading = useSelector(selectActivityLoading)
  const error = useSelector(selectActivityError)
  const filters = useSelector(selectActivityFilters)
  const counts = useSelector(selectActivityCounts)
  const avgConfidence = useSelector(selectAvgConfidence)
  const agents = useSelector(selectActiveAgents)

  const { result, agentId, intent, minConfidence, days, limit } = filters

  useEffect(() => {
    const params = {
      result,
      agentId,
      intent,
      minConfidence,
      days,
      limit
    }

    const run = () => dispatch(fetchEmailActivityStream({ params }))

    run()

    const id = setInterval(run, 5000)

    return () => clearInterval(id)
  }, [dispatch, result, agentId, intent, minConfidence, days, limit])

  return (
    <div className='flex h-full min-h-[700px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 mr-0.5'>
      {' '}
      {/* Header */}
      <div className='flex items-center justify-between border-b border-zinc-800 px-5 py-4'>
        <div className='flex items-center gap-2'>
          <Terminal size={18} className='text-emerald-400' />
          <h2 className='font-semibold text-white'>Activity Stream</h2>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-2 w-2 animate-pulse rounded-full bg-emerald-400' />
          <span className='text-xs text-zinc-400'>Refresh: 500ms</span>
        </div>
      </div>
      {/* Stats */}
      <StatsStrip counts={counts} avgConfidence={avgConfidence} />
      {/* Filters */}
      <FilterBar filters={filters} agents={agents} dispatch={dispatch} />
      {/* Log list */}
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {' '}
        {loading &&
          activities.length === 0 &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='h-20 rounded-xl border border-zinc-800 bg-zinc-950 animate-pulse'
            />
          ))}
        {error && (
          <div className='flex items-center gap-3 rounded-xl border border-red-900/50 bg-red-500/10 p-4'>
            <XCircle size={16} className='text-red-400 shrink-0' />
            <p className='text-sm text-red-400'>{error}</p>
          </div>
        )}
        {!error &&
          activities.map(activity => (
            <LogRow key={activity.id} activity={activity} />
          ))}
        {!loading && !error && activities.length === 0 && (
          <p className='text-center text-sm text-zinc-500 py-8'>
            No activity in this period.
          </p>
        )}
      </div>
    </div>
  )
}
