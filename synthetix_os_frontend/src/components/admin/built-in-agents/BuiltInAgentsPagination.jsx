import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectBuiltInAgentsCount,
  selectBuiltInAgentsFilters,
  updateFilter
} from '@/store/slices/builtInAgentsSlice'

function BuiltInAgentsPagination() {
  const dispatch = useDispatch()

  const count = useSelector(selectBuiltInAgentsCount)
  const filters = useSelector(selectBuiltInAgentsFilters)

  const totalPages = Math.max(
    1,
    Math.ceil(count / filters.page_size)
  )

  const isFirstPage = filters.page === 1
  const isLastPage = filters.page === totalPages

  const goToPage = page => {
    dispatch(
      updateFilter({
        key: 'page',
        value: page
      })
    )
  }

  return (
    <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between'>
      <div className='flex items-center gap-2 text-sm'>
        <span className='font-medium text-zinc-200'>
          {count}
        </span>

        <span className='text-zinc-500'>
          agent{count !== 1 ? 's' : ''}
        </span>
      </div>

      <div className='flex items-center gap-3'>
        <button
          type='button'
          disabled={isFirstPage}
          onClick={() => goToPage(filters.page - 1)}
          className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40'
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <div className='rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm'>
          <span className='font-medium text-zinc-200'>
            {filters.page}
          </span>

          <span className='mx-2 text-zinc-600'>/</span>

          <span className='text-zinc-500'>
            {totalPages}
          </span>
        </div>

        <button
          type='button'
          disabled={isLastPage}
          onClick={() => goToPage(filters.page + 1)}
          className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40'
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default BuiltInAgentsPagination