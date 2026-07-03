import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getWorkflowExecutionStats} from "../../api/workflowExecutionStatics"

export const fetchWorkflowExecutionStats = createAsyncThunk(
  'workflowExecution/fetchStats',
  async ({ days = 7 } = {}, { rejectWithValue }) => {
    try {
      const response = await getWorkflowExecutionStats(days)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch workflow execution stats'
      )
    }
  }
)

const initialState = {
  summary: {
    total: 0,
    success: 0,
    failed: 0,
    running: 0,
    success_rate: 0,
    failure_rate: 0
  },
  daily: [], // [{ date, total, success, failed, running, success_rate, failure_rate }]
  days: 7, // active filter — kept in state so components can read it
  workflowId: null, // null means "all workflows"
  loading: false,
  error: null
}

const workflowExecutionSlice = createSlice({
  name: 'workflowExecution',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    setFilters: (state, action) => {
      // Lets components update filters without immediately re-fetching
      if (action.payload.days !== undefined) state.days = action.payload.days
      if (action.payload.workflowId !== undefined)
        state.workflowId = action.payload.workflowId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWorkflowExecutionStats.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWorkflowExecutionStats.fulfilled, (state, action) => {
        state.loading = false
        state.summary = action.payload.summary
        state.daily = action.payload.daily
      })
      .addCase(fetchWorkflowExecutionStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError, setFilters } = workflowExecutionSlice.actions

// Selectors
export const selectWorkflowExecutionState = state => state.workflowExecution
export const selectExecutionSummary = state => state.workflowExecution.summary
export const selectExecutionDailyStats = state => state.workflowExecution.daily
export const selectExecutionDays = state => state.workflowExecution.days
export const selectExecutionWorkflowId = state =>
  state.workflowExecution.workflowId
export const selectExecutionLoading = state => state.workflowExecution.loading
export const selectExecutionError = state => state.workflowExecution.error

export default workflowExecutionSlice.reducer
