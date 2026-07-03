import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBuiltInAgents } from '@/api/builtInAgents'

const initialState = {
  results: [],
  count: 0,
  next: null,
  previous: null,

  filters: {
    page: 1,
    page_size: 10,
    search: '',
    ordering: 'name',
    has_tools: '',
    has_integrations: ''
  },

  loading: false,
  error: null
}

export const fetchBuiltInAgents = createAsyncThunk(
  'builtInAgents/fetchBuiltInAgents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().builtInAgents

      const params = Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => value !== '' && value !== null
        )
      )

      const response = await getBuiltInAgents(params)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch built-in agents'
      )
    }
  }
)

const builtInAgentsSlice = createSlice({
  name: 'builtInAgents',

  initialState,

  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload

      state.filters[key] = value

      if (key !== 'page') {
        state.filters.page = 1
      }
    },

    toggleOrdering: state => {
      state.filters.ordering =
        state.filters.ordering === 'name' ? '-name' : 'name'

      state.filters.page = 1
    },

    clearError: state => {
      state.error = null
    },

    resetFilters: state => {
      state.filters = initialState.filters
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBuiltInAgents.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchBuiltInAgents.fulfilled, (state, action) => {
        state.loading = false

        state.results = action.payload.results || []
        state.count = action.payload.count || 0
        state.next = action.payload.next
        state.previous = action.payload.previous
      })

      .addCase(fetchBuiltInAgents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { updateFilter, toggleOrdering, clearError, resetFilters } =
  builtInAgentsSlice.actions

export const selectBuiltInAgents = state => state.builtInAgents.results

export const selectBuiltInAgentsCount = state => state.builtInAgents.count

export const selectBuiltInAgentsFilters = state => state.builtInAgents.filters

export const selectBuiltInAgentsLoading = state => state.builtInAgents.loading

export const selectBuiltInAgentsError = state => state.builtInAgents.error

export default builtInAgentsSlice.reducer
