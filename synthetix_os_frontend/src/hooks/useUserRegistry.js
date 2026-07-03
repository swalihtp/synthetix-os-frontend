// useUserRegistry.js — encapsulates all dispatch + selector logic

import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  setFilter,
  clearFilters,
  goToNextPage,
  goToPrevPage,
  selectUsers,
  selectStatus,
  selectError,
  selectFilters,
  selectCurrentPage,
  selectTotalCount,
  selectTotalPages,
  selectHasNext,
  selectHasPrev
} from '../store/slices/userRegistrySlice2'

export function useUserRegistry () {
  const dispatch = useDispatch()

  // ── Selectors ──────────────────────────────────────────────────────────
  const users = useSelector(selectUsers)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const filters = useSelector(selectFilters)
  const currentPage = useSelector(selectCurrentPage)
  const totalCount = useSelector(selectTotalCount)
  const totalPages = useSelector(selectTotalPages)
  const hasNext = useSelector(selectHasNext)
  const hasPrev = useSelector(selectHasPrev)

  // ── Fetch whenever page or filters change ──────────────────────────────
  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, ...filters }))
  }, [dispatch, currentPage, filters])

  // ── Action creators ────────────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (key, value) => dispatch(setFilter({ key, value })),
    [dispatch]
  )

  const handleClearFilters = useCallback(
    () => dispatch(clearFilters()),
    [dispatch]
  )

  const handleNextPage = useCallback(() => dispatch(goToNextPage()), [dispatch])

  const handlePrevPage = useCallback(() => dispatch(goToPrevPage()), [dispatch])

  return {
    // data
    users,
    status,
    error,
    filters,
    // pagination
    currentPage,
    totalCount,
    totalPages,
    hasNext,
    hasPrev,
    // actions
    handleFilterChange,
    handleClearFilters,
    handleNextPage,
    handlePrevPage
  }
}
