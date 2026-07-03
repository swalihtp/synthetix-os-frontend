import { Activity } from 'lucide-react'

import RecentActivityItem from './RecentActivityItem'

export default function RecentActivity ({ data = [] }) {
  const visibleData = data.slice(0, 10)

  return (
    <section className='rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-sm'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <Activity size={18} className='text-emerald-300' />
            <h2 className='text-lg font-semibold text-white'>
              Recent Activity
            </h2>
          </div>

          <p className='mt-2 max-w-xl text-sm leading-6 text-zinc-500'>
            Latest activity across your AI workspace.
          </p>
        </div>

        <span className='rounded-full border border-zinc-800 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300'>
          {data.length} {data.length === 1 ? 'Event' : 'Events'}
        </span>
      </div>

      {visibleData.length === 0 ? (
        <div className='flex h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/30'>
          <Activity size={36} className='mb-4 text-zinc-700' />
          <h3 className='text-lg font-medium text-white'>No Recent Activity</h3>
          <p className='mt-2 max-w-sm text-center text-sm text-zinc-500'>
            Start using your AI applications. Your recent executions, workflow
            updates and AI tasks will appear here.
          </p>
        </div>
      ) : (
        <div className='max-h-[560px] overflow-y-auto pr-2 custom-scrollbar'>
          <div className='relative'>
            <div className='absolute left-[11px] top-2 bottom-0 w-px bg-zinc-800' />

            <div className='space-y-8'>
              {visibleData.map(activity => (
                <RecentActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
