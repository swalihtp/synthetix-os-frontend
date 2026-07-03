import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '@/api/auth'

const PAGE_SIZE = 5

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, search = '', role = '', is_active = '' }, thunkAPI) => {
    const params = new URLSearchParams({
      page,
      ...(search && { search }),
      ...(role && { role }),
      ...(is_active !== '' && { is_active })
    })

    const response = await API.get(`system-admin/users/?${params}`)
    return response.data
  }
)


const userSlice = createSlice({
  name: 'users',
  initialState: {
    // data
    list: [],
    totalCount: 0,
    // pagination
    currentPage: 1,
    pageSize: PAGE_SIZE,
    hasNext: false,
    hasPrev: false,
    // filters
    filters: {
      search: '',
      role: '',
      is_active: ''
    },
    // ui state
    status: 'idle', // "idle" | "loading" | "succeeded" | "failed"
    error: null
  },

  reducers: {
    setFilter (state, action) {
      // action.payload: { key: "search" | "role" | "is_active", value: string }
      state.filters[action.payload.key] = action.payload.value
      state.currentPage = 1 // reset to first page on filter change
    },

    clearFilters (state) {
      state.filters = { search: '', role: '', is_active: '' }
      state.currentPage = 1
    },

    goToNextPage (state) {
      if (state.hasNext) state.currentPage += 1
    },

    goToPrevPage (state) {
      if (state.hasPrev) state.currentPage -= 1
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { count, next, previous, results } = action.payload
        state.status = 'succeeded'
        state.list = results
        state.totalCount = count
        state.hasNext = Boolean(next)
        state.hasPrev = Boolean(previous)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// ─── Exports ─────────────────────────────────────────────────────────────────

export const { setFilter, clearFilters, goToNextPage, goToPrevPage } =
  userSlice.actions

// Selectors
export const selectUsers = state => state.users.list
export const selectStatus = state => state.users.status
export const selectError = state => state.users.error
export const selectFilters = state => state.users.filters
export const selectCurrentPage = state => state.users.currentPage
export const selectTotalCount = state => state.users.totalCount
export const selectPageSize = state => state.users.pageSize
export const selectHasNext = state => state.users.hasNext
export const selectHasPrev = state => state.users.hasPrev
export const selectTotalPages = state =>
  Math.ceil(state.users.totalCount / state.users.pageSize)

export default userSlice.reducer
