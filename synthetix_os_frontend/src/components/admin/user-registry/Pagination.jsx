import { ChevronLeft, ChevronRight, Database } from 'lucide-react'

export function Pagination ({
  currentPage,
  totalPages,
  totalCount,
  hasNext,
  hasPrev,
  onNext,
  onPrev
}) {
  if (totalCount === 0) return null

  return (
    <div className='flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900'>
          <Database className='h-5 w-5 text-emerald-400' />
        </div>

        <div>
          <p className='text-sm font-medium text-zinc-100'>
            Page <span className='text-emerald-400'>{currentPage}</span> of{' '}
            <span className='text-emerald-400'>{totalPages}</span>
          </p>

          <p className='text-xs text-zinc-500'>{totalCount} registered users</p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label='Previous page'
          className='inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900'
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-label='Next page'
          className='inline-flex h-12 items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 text-sm font-medium text-emerald-300 transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-zinc-900 disabled:text-zinc-600'
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
