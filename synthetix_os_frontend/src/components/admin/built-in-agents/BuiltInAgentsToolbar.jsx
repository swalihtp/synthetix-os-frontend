import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectBuiltInAgentsFilters,
  updateFilter
} from '@/store/slices/builtInAgentsSlice'

import FilterChip from './FilterChip'

function BuiltInAgentsToolbar () {
  const dispatch = useDispatch()

  const filters = useSelector(selectBuiltInAgentsFilters)

  const [searchInput, setSearchInput] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        updateFilter({
          key: 'search',
          value: searchInput.trim()
        })
      )
    }, 350)

    return () => clearTimeout(timer)
  }, [searchInput, dispatch])

  const handleTools = value => {
    dispatch(
      updateFilter({
        key: 'has_tools',
        value: value === 'any' ? '' : value === 'yes'
      })
    )
  }

  const handleIntegrations = value => {
    dispatch(
      updateFilter({
        key: 'has_integrations',
        value: value === 'any' ? '' : value === 'yes'
      })
    )
  }

  return (
    <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950 px-5 py-4 md:flex-row md:items-center md:justify-between'>
      <div className='relative w-full md:max-w-md'>
        <Search
          size={16}
          className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
        />

        <input
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder='Search by name or description...'
          className='h-11 w-full rounded-xl border border-white/10 bg-white/[0.02] pl-11 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-violet-500/40 focus:bg-white/[0.03]'
        />
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <select
          value={
            filters.has_tools === '' ? 'any' : filters.has_tools ? 'yes' : 'no'
          }
          onChange={e => handleTools(e.target.value)}
          className='h-11 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-zinc-300 outline-none transition-colors focus:border-violet-500/40'
        >
          <option value='any'>All tools</option>
          <option value='yes'>Has tools</option>
          <option value='no'>No tools</option>
        </select>

        <select
          value={
            filters.has_integrations === ''
              ? 'any'
              : filters.has_integrations
              ? 'yes'
              : 'no'
          }
          onChange={e => handleIntegrations(e.target.value)}
          className='h-11 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-zinc-300 outline-none transition-colors focus:border-violet-500/40'
        >
          <option value='any'>All integrations</option>
          <option value='yes'>Has integrations</option>
          <option value='no'>No integrations</option>
        </select>
      </div>
    </div>
  )
}

export default BuiltInAgentsToolbar
