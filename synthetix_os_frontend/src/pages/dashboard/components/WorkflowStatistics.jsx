import { BarChart3 } from 'lucide-react'
import clsx from 'clsx'

const barStyles = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500'
}

export default function WorkflowStatistics ({
  data = {
    completed: 0,
    running: 0,
    failed: 0
  }
}) {
  const total = (data.completed ?? 0) + (data.running ?? 0) + (data.failed ?? 0)

  const successRate =
    total === 0 ? 0 : (((data.completed ?? 0) / total) * 100).toFixed(1)

  const rows = [
    { label: 'Completed', value: data.completed ?? 0, color: 'emerald' },
    { label: 'Failed', value: data.failed ?? 0, color: 'red' },
    { label: 'Running', value: data.running ?? 0, color: 'blue' }
  ]

  return (
    <section className='rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-sm'>
      <div className='mb-6'>
        <div className='flex items-center gap-2'>
          <BarChart3 size={18} className='text-emerald-300' />
          <h2 className='text-lg font-semibold text-white'>
            Workflow Statistics
          </h2>
        </div>

        <p className='mt-2 max-w-xl text-sm leading-6 text-zinc-500'>
          Overview of workflow execution performance.
        </p>
      </div>

      <div className='space-y-6'>
        {rows.map(row => {
          const percentage = total === 0 ? 0 : Math.round((row.value / total) * 100)

          return (
            <div key={row.label}>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-zinc-400'>
                  {row.label}
                </span>
                <span className='text-sm font-semibold text-white'>
                  {row.value}
                </span>
              </div>

              <div className='h-2 rounded-full bg-zinc-800'>
                <div
                  className={clsx('h-full rounded-full transition-all duration-700', barStyles[row.color])}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className='my-8 h-px bg-zinc-800' />

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-zinc-500'>Total Executions</span>
          <span className='font-semibold text-white'>{total}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-zinc-500'>Success Rate</span>
          <span className='font-semibold text-emerald-400'>{successRate}%</span>
        </div>
      </div>
    </section>
  )
}
