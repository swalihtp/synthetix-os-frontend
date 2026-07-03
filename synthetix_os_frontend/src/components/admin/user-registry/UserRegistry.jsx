import { useUserRegistry } from '../../../hooks/useUserRegistry'
import { SearchBar } from './SearchBar'
import { FilterBar } from './FilterBar'
import { UserTable } from './UserTable'
import { Pagination } from './Pagination'
import { useState } from 'react'
import { RegisterAdminModal } from './RegisterAdminModal'

export default function UserRegistry () {
  const {
    users,
    status,
    error,
    filters,
    currentPage,
    totalCount,
    totalPages,
    hasNext,
    hasPrev,
    handleFilterChange,
    handleClearFilters,
    handleNextPage,
    handlePrevPage
  } = useUserRegistry()
  const [showAdminModal, setShowAdminModal] = useState(false)

  return (
    <div className='space-y-6 p-6'>
      <header className='flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-semibold tracking-tight text-zinc-100'>
            USER_REGISTRY
          </h1>

          <p className='mt-2 text-sm text-zinc-400'>
            Manage and review all registered accounts
          </p>
        </div>

        <div className='rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3'>
          <button
            onClick={() => setShowAdminModal(true)}
            className='rounded-xl bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400'
          >
            Add Admin
          </button>
        </div>
      </header>

      <section className='rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5 backdrop-blur-xl'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <SearchBar value={filters.search} onChange={handleFilterChange} />

          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>
      </section>

      {error && (
        <div className='rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300'>
          ⚠ {error}
        </div>
      )}

      <section className='overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-xl'>
        <UserTable users={users} status={status} />
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />

      {showAdminModal && (
        <RegisterAdminModal onClose={() => setShowAdminModal(false)} />
      )}
    </div>
  )
}
