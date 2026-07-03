import { History } from 'lucide-react'

import ContinueWorkItem from './ContinueWorkItem'

export default function ContinueWorking ({ data = [] }) {
  return (
    <section className='rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-sm'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <History size={18} className='text-emerald-300' />
            <h2 className='text-lg font-semibold text-white'>
              Continue Working
            </h2>
          </div>

          <p className='mt-2 max-w-xl text-sm leading-6 text-zinc-500'>
            Resume unfinished executions and jump back into the latest jobs
            that still matter.
          </p>
        </div>

        <button
          type='button'
          className='text-sm font-medium text-emerald-300 transition hover:text-emerald-200'
        >
          View All
        </button>
      </div>

      {data.length === 0 ? (
        <div className='rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/30 py-14 text-center'>
          <p className='text-zinc-300'>No recent work found.</p>
          <p className='mt-2 text-sm text-zinc-500'>
            Start using one of the AI applications to see activity here.
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {data.map(item => (
            <ContinueWorkItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
