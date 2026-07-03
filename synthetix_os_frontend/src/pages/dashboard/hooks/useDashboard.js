import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDashboard } from '@/store/slices/dashboardSlice'

export default function useDashboard () {
  const dispatch = useDispatch()

  const dashboard = useSelector(state => state.dashboard.data)
  const loading = useSelector(state => state.dashboard.loading)
  const error = useSelector(state => state.dashboard.error)

  useEffect(() => {
    if (!dashboard && !loading) {
      dispatch(fetchDashboard())
    }
  }, [dashboard, dispatch, loading])

  return {
    dashboard,
    loading,
    error,
    refresh: () => dispatch(fetchDashboard())
  }
}
