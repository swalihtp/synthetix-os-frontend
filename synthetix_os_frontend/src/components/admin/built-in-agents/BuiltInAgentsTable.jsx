import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, ChevronUp, Inbox, AlertTriangle } from 'lucide-react'

import {
  selectBuiltInAgents,
  selectBuiltInAgentsError,
  selectBuiltInAgentsFilters,
  selectBuiltInAgentsLoading,
  toggleOrdering
} from '@/store/slices/builtInAgentsSlice'

import BuiltInAgentRow from './BuiltInAgentRow'

function BuiltInAgentsTable () {
  const dispatch = useDispatch()

  const rows = useSelector(selectBuiltInAgents)
  const loading = useSelector(selectBuiltInAgentsLoading)
  const error = useSelector(selectBuiltInAgentsError)
  const filters = useSelector(selectBuiltInAgentsFilters)

  return (
    <div className='overflow-hidden rounded-2xl border border-white/10 bg-zinc-950'>
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead className='border-b border-white/10 bg-white/[0.02]'>
            <tr>
              <th className='px-6 py-4 text-left'>
                <button
                  type='button'
                  onClick={() => dispatch(toggleOrdering())}
                  className='flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500 transition-colors hover:text-zinc-300'
                >
                  Name
                  {filters.ordering === '-name' ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronUp size={14} />
                  )}
                </button>
              </th>

              <th className='px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-500'>
                Description
              </th>

              <th className='px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-500'>
                Tools
              </th>

              <th className='px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-500'>
                Integrations
              </th>

              <th className='px-6 py-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-500'>
                ID
              </th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className='border-b border-white/5'>
                  <td colSpan={5} className='px-6 py-5'>
                    <div className='h-4 animate-pulse rounded-md bg-white/5' />
                  </td>
                </tr>
              ))}

            {!loading && error && (
              <tr>
                <td colSpan={5} className='px-6 py-16'>
                  <div className='flex flex-col items-center gap-3 text-zinc-500'>
                    <AlertTriangle size={20} />

                    <p className='text-sm'>{error}</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading && !error && rows.length === 0 && (
              <tr>
                <td colSpan={5} className='px-6 py-16'>
                  <div className='flex flex-col items-center gap-3 text-zinc-500'>
                    <Inbox size={20} />

                    <p className='text-sm'>No agents match your filters.</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              rows.map(agent => (
                <BuiltInAgentRow key={agent.id} agent={agent} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BuiltInAgentsTable
