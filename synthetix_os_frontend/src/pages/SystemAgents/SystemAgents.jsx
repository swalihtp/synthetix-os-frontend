import { useCallback, useEffect, useRef, useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import AgentHeader from './components/AgentHeader'
import SearchBar from './components/SearchBar'
import AgentGrid from './components/AgentGrid'
import EmptyState from './components/EmptyState'
import { getBuiltInAgent } from '../../api/agents'
import LoadingGateway from '@/components/ui/LoadingGateway'

function normalizeBuiltInAgentsResponse (response) {
  const payload = response?.data ?? response ?? {}

  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : []

  return {
    items,
    count: Number(payload?.count ?? items.length ?? 0),
    next: payload?.next ?? null,
    previous: payload?.previous ?? null
  }
}

export default function SystemAgents () {
  const [search, setSearch] = useState('')
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const pageSizeRef = useRef(0)
  const previousSearchRef = useRef('')
  const skipNextPageLoadRef = useRef(false)

  const loadAgents = useCallback(async ({ page = 1, searchTerm = '' } = {}) => {
    setLoading(true)

    try {
      const res = await getBuiltInAgent({
        search: searchTerm,
        page
      })
      const normalized = normalizeBuiltInAgentsResponse(res)
      const count = normalized.count
      const items = normalized.items

      setAgents(items)
      setTotalCount(count)

      if (page === 1 || pageSizeRef.current === 0) {
        pageSizeRef.current = items.length || count || 1
      }

      const pageSize = pageSizeRef.current || items.length || 1
      setTotalPages(Math.max(1, Math.ceil(count / pageSize)))

      return items
    } catch (err) {
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 2000)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const searchChanged = previousSearchRef.current !== debouncedSearch

    if (searchChanged) {
      previousSearchRef.current = debouncedSearch

      if (currentPage !== 1) {
        skipNextPageLoadRef.current = true
        setCurrentPage(1)
        loadAgents({ page: 1, searchTerm: debouncedSearch })
        return
      }
    }

    previousSearchRef.current = debouncedSearch

    if (skipNextPageLoadRef.current) {
      skipNextPageLoadRef.current = false
      return
    }

    loadAgents({ page: currentPage, searchTerm: debouncedSearch })
  }, [currentPage, debouncedSearch, loadAgents])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading && agents.length === 0) {
    return <LoadingGateway />
  }

  return (
    <div className='flex bg-[#050505] min-h-screen text-zinc-300 font-mono'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='p-6 lg:p-10 space-y-8'>
          <AgentHeader />

          <SearchBar value={search} onChange={setSearch} />

          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <div>
              <h2 className='text-xl font-bold text-white'>
                Available Agents
              </h2>

              <p className='text-zinc-500 text-sm mt-1'>
                {totalCount} System Agents
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className='px-4 py-2 border border-zinc-700 disabled:opacity-50'
              >
                Previous
              </button>

              <span className='text-sm text-zinc-400'>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className='px-4 py-2 border border-zinc-700 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>

          {agents.length ? <AgentGrid agents={agents} /> : <EmptyState />}
        </main>
      </div>
    </div>
  )
}
