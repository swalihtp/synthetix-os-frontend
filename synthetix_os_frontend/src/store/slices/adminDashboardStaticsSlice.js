import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDashboardStatistics } from '@/api/adminDashboardStatic'


// Async thunk for fetching dashboard statistics

export const fetchDashboardStatistics = createAsyncThunk(
  'dashboard/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardStatistics()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard statistics'
      )
    }
  }
)

const initialState = {
  users: {
    total: 0,
    active: 0
  },
  agents: {
    total: 0
  },
  workflow_executions: {
    total: 0,
    success: 0,
    failed: 0,
    running: 0
  },
  loading: false,
  error: null
}

const adminDashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardStatistics.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardStatistics.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.agents = action.payload.agents
        state.workflow_executions = action.payload.workflow_executions
      })
      .addCase(fetchDashboardStatistics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = adminDashboardSlice.actions

// Selectors
export const selectDashboardStats = state => state.dashboard
export const selectUserStats = state => state.dashboard.users
export const selectAgentStats = state => state.dashboard.agents
export const selectWorkflowExecutionStats = state => state.dashboard.workflow_executions
export const selectDashboardLoading = state => state.dashboard.loading
export const selectDashboardError = state => state.dashboard.error

export default adminDashboardSlice.reducer
