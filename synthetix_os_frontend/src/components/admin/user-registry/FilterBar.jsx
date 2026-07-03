import { Shield, Activity, RotateCcw } from 'lucide-react'

const ROLES = ['system_admin', 'user']

export function FilterBar ({ filters, onChange, onClear }) {
  const hasActiveFilters =
    filters.role !== '' || filters.is_active !== '' || filters.search !== ''

  const selectStyles =
    'h-12 w-full appearance-none rounded-2xl border border-zinc-800 bg-zinc-950/70 px-11 pr-10 text-sm text-zinc-100 backdrop-blur-xl outline-none transition-all duration-200 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/10'

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <div className='relative min-w-[180px] flex-1 sm:flex-none'>
        <Shield
          size={16}
          className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
        />

        <select
          value={filters.role}
          onChange={e => onChange('role', e.target.value)}
          aria-label='Filter by role'
          className={selectStyles}
        >
          <option value=''>All roles</option>

          {ROLES.filter(Boolean).map(role => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>

        <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500'>
          ▼
        </span>
      </div>

      <div className='relative min-w-[180px] flex-1 sm:flex-none'>
        <Activity
          size={16}
          className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
        />

        <select
          value={filters.is_active}
          onChange={e => onChange('is_active', e.target.value)}
          aria-label='Filter by status'
          className={selectStyles}
        >
          <option value=''>All status</option>
          <option value='true'>Active</option>
          <option value='false'>Inactive</option>
        </select>

        <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500'>
          ▼
        </span>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className='inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300'
        >
          <RotateCcw size={16} />
          Clear filters
        </button>
      )}
    </div>
  )
}
