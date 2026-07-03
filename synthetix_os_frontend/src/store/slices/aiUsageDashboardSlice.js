import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAIUsageDashboard } from '../../api/aiUsageDashboard'

// ─── Thunk ───────────────────────────────────────────────────────────────────

export const fetchAIUsageDashboard = createAsyncThunk(
  'aiUsageDashboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAIUsageDashboard()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch AI usage dashboard'
      )
    }
  }
)

// ─── Slice ───────────────────────────────────────────────────────────────────

const initialState = {
  today: null, // { date, total_calls, by_operation, by_provider, by_model }
  trend: [], // [{ date, total_calls, by_operation, by_provider }]
  loading: false,
  error: null
}

const aiUsageDashboardSlice = createSlice({
  name: 'aiUsageDashboard',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAIUsageDashboard.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAIUsageDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.today = action.payload.today
        state.trend = action.payload.last_7_days_trend
      })
      .addCase(fetchAIUsageDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = aiUsageDashboardSlice.actions

// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectAIUsageDashboard = state => state.aiUsageDashboard
export const selectAIUsageToday = state => state.aiUsageDashboard.today
export const selectAIUsageTrend = state => state.aiUsageDashboard.trend
export const selectAIUsageLoading = state => state.aiUsageDashboard.loading
export const selectAIUsageError = state => state.aiUsageDashboard.error

export default aiUsageDashboardSlice.reducer
