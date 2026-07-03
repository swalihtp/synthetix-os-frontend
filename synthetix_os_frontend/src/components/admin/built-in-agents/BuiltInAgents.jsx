import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBuiltInAgents, selectBuiltInAgentsFilters } from '@/store/slices/builtInAgentsSlice'

import BuiltInAgentsToolbar from './BuiltInAgentsToolbar'
import BuiltInAgentsTable from './BuiltInAgentsTable'
import BuiltInAgentsPagination from './BuiltInAgentsPagination'

function BuiltInAgentsPage () {
  const dispatch = useDispatch()
  const filters = useSelector(selectBuiltInAgentsFilters)

  useEffect(() => {
    dispatch(fetchBuiltInAgents())
  }, [dispatch,filters])

  return (
    <div className='space-y-4'>
      <BuiltInAgentsToolbar />
      <BuiltInAgentsTable />
      <BuiltInAgentsPagination />
    </div>
  )
}

export default BuiltInAgentsPage


