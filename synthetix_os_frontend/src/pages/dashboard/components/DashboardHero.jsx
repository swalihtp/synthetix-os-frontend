import { Activity, Bot, CheckCircle2, Database, Sparkles, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'

const formatCount = value => new Intl.NumberFormat('en-US').format(value ?? 0)

const statToneClasses = {
  emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  blue: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  rose: 'border-rose-500/20 bg-rose-500/10 text-rose-300'
}

export default function DashboardHero ({
  overview = {},
  activity = {},
  workflowStatistics = {}
}) {
  const hour = new Date().getHours()

  const greeting =
    hour < 12 ? 'Good Morning'
    : hour < 18 ? 'Good Afternoon'
    : 'Good Evening'

  const snapshotStats = [
    {
      label: 'Completed Today',
      value: overview.completed_today ?? workflowStatistics.completed ?? 0,
      icon: CheckCircle2,
      tone: 'emerald'
    },
    {
      label: 'Running Workflows',
      value: overview.running_workflows ?? workflowStatistics.running ?? 0,
      icon: Workflow,
      tone: 'blue'
    },
    {
      label: 'Failed Today',
      value: overview.failed_today ?? workflowStatistics.failed ?? 0,
      icon: Activity,
      tone: 'rose'
    }
  ]

  const insightStats = [
    {
      label: 'Agents',
      value: overview.agents ?? 0,
      icon: Bot
    },
    {
      label: 'Built-in Agents',
      value: overview.built_in_agents ?? 0,
      icon: Database
    },
    {
      label: 'AI Calls',
      value: activity.ai_calls ?? 0,
      icon: Sparkles
    }
  ]

  return (
    <section className='relative overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:p-8'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.08),_transparent_26%)]' />
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />

      <div className='relative grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-wrap items-center gap-3'>
            <span className='inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300'>
              <span className='h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' />
              Live workspace
            </span>

            <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-zinc-300'>
              <Sparkles size={12} />
              AI orchestration dashboard
            </span>
          </div>

          <div className='space-y-3'>
            <p className='text-xs uppercase tracking-[0.45em] text-zinc-500'>
              AI Workspace
            </p>

            <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
              {greeting}
              <span className='mt-1 block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent'>
                Manage everything from one command center.
              </span>
            </h1>

            <p className='max-w-2xl text-base leading-7 text-zinc-400'>
              Monitor agents, workflows, and unfinished work from a single
              polished workspace. The key signals stay visible without losing
              the structure you already use across the app.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-4'>
            <Link
              to='/system-agents'
              className='inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 active:scale-[0.98]'
            >
              Hire Agent
            </Link>

            <Link
              to='/agents'
              className='inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]'
            >
              Manage Agents
            </Link>
          </div>

          <div className='flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500'>
            <Database size={14} className='text-zinc-400' />
            <span>
              Workspace status: {formatCount(overview.agents)} Agents {'•'}{' '}
              {formatCount(overview.workflows)} Workflows {'•'}{' '}
              {formatCount(overview.completed_today)} Completed Today
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-[1.5rem] border border-zinc-800 bg-white/5 p-5 backdrop-blur-sm'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-[0.35em] text-zinc-500'>
                Today at a glance
              </p>
              <h2 className='mt-1.5 text-base font-semibold text-white'>
                Workflow pulse
              </h2>
            </div>

            <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300'>
              <Activity size={12} className='text-emerald-300' />
              Syncing
            </div>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
            {snapshotStats.map(stat => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-4 ${statToneClasses[stat.tone]}`}
                >
                  <div className='flex items-start justify-between gap-2'>
                    <div className='min-w-0'>
                      <p className='truncate text-xs uppercase tracking-[0.25em] opacity-70'>
                        {stat.label}
                      </p>
                      <div className='mt-3 text-2xl font-semibold text-white'>
                        {formatCount(stat.value)}
                      </div>
                    </div>

                    <div className='shrink-0 rounded-xl bg-black/20 p-2'>
                      <Icon size={16} className='text-white/90' />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='grid grid-cols-3 gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4'>
            {insightStats.map(stat => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className='flex flex-col items-start gap-2'>
                  <div className='rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-200'>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className='text-[10px] uppercase tracking-[0.25em] text-zinc-500'>
                      {stat.label}
                    </p>
                    <p className='mt-0.5 text-base font-semibold text-white'>
                      {formatCount(stat.value)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
