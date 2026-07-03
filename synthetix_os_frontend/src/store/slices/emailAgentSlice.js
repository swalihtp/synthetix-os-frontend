import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getEmailAgent,
  getEmailExecutions,
  getEmailExecutionDetail,
  approveHumanReviewApi,
  rejectHumanReviewApi,
  getEmailAgentDashboard,
  manualReplyApi
} from '@/api/emailAgent'

// FETCH EMAIL AGENT
export const fetchEmailAgent = createAsyncThunk(
  'emailAgent/fetchEmailAgent',

  async (agentId, { rejectWithValue }) => {
    try {
      const response = await getEmailAgent(agentId)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch email agent'
      )
    }
  }
)

// FETCH EMAIL EXECUTIONS
export const fetchEmailExecutions = createAsyncThunk(
  'emailAgent/fetchEmailExecutions',

  async ({ agentId, page = 1, result = 'ALL' }, { rejectWithValue }) => {
    try {
      const response = await getEmailExecutions(agentId, page, result)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch email executions'
      )
    }
  }
)

// FETCH SINGLE EXECUTION DETAIL
export const fetchEmailExecutionDetail = createAsyncThunk(
  'emailAgent/fetchEmailExecutionDetail',

  async (executionId, { rejectWithValue }) => {
    try {
      const response = await getEmailExecutionDetail(executionId)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch email execution detail'
      )
    }
  }
)

// APPROVE HUMAN REVIEW
export const approveHumanReview = createAsyncThunk(
  'emailAgent/approveHumanReview',

  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await approveHumanReviewApi(reviewId)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to approve human review'
      )
    }
  }
)

// REJECT HUMAN REVIEW
export const rejectHumanReview = createAsyncThunk(
  'emailAgent/rejectHumanReview',

  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await rejectHumanReviewApi(reviewId)

      return {
        reviewId,
        data: response.data
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to reject human review'
      )
    }
  }
)

// FETCH DASHBOARD
export const fetchEmailAgentDashboard = createAsyncThunk(
  'emailAgent/fetchDashboard',

  async (agentId, { rejectWithValue }) => {
    try {
      const response = await getEmailAgentDashboard(agentId)

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard'
      )
    }
  }
)

export const manualReply = createAsyncThunk(
  'emailAgent/manualReply',

  async ({ executionId, subject, body }, { rejectWithValue }) => {
    try {
      const response = await manualReplyApi(executionId, {
        subject,
        body
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send reply'
      )
    }
  }
)

const initialState = {
  agent: null,
  dashboard: null,

  selectedResult: 'ALL',

  emailExecutions: [],

  executionDetail: null,
  executionDetailLoading: false,

  loading: false,
  dashboardLoading: false,
  reviewLoading: false,

  reviewActionLoading: false,

  currentPage: 1,
  totalPages: 1,
  totalCount: 0,

  next: null,
  previous: null,

  error: null
}

const emailAgentSlice = createSlice({
  name: 'emailAgent',

  initialState,

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setSelectedResult: (state, action) => {
      state.selectedResult = action.payload
      state.currentPage = 1
    },

    clearReviewDetail: state => {
      state.reviewDetail = null
    },

    clearEmailAgentError: state => {
      state.error = null
    }
  },

  extraReducers: builder => {
    builder

      // FETCH EMAIL AGENT
      .addCase(fetchEmailAgent.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchEmailAgent.fulfilled, (state, action) => {
        state.loading = false
        state.agent = action.payload
      })

      .addCase(fetchEmailAgent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // FETCH EMAIL EXECUTIONS
      .addCase(fetchEmailExecutions.pending, state => {
        state.reviewLoading = true
        state.error = null
      })

      .addCase(fetchEmailExecutions.fulfilled, (state, action) => {
        state.reviewLoading = false

        state.emailExecutions = action.payload.results || []

        state.totalCount = action.payload.count || 0
        state.next = action.payload.next
        state.previous = action.payload.previous

        state.totalPages = Math.max(
          1,
          Math.ceil((action.payload.count || 0) / 5)
        )
      })

      .addCase(fetchEmailExecutions.rejected, (state, action) => {
        state.reviewLoading = false
        state.error = action.payload
      })

      // FETCH REVIEW DETAIL
      .addCase(fetchEmailExecutionDetail.pending, state => {
        state.executionDetailLoading = true
      })

      .addCase(fetchEmailExecutionDetail.fulfilled, (state, action) => {
        state.executionDetailLoading = false
        state.executionDetail = action.payload
      })

      .addCase(fetchEmailExecutionDetail.rejected, (state, action) => {
        state.executionDetailLoading = false
        state.error = action.payload
      })

      // APPROVE REVIEW
      .addCase(approveHumanReview.pending, state => {
        state.reviewActionLoading = true
        state.error = null
      })

      .addCase(approveHumanReview.fulfilled, (state, action) => {
        state.reviewActionLoading = false
        state.reviewDetail = action.payload

        if (state.selectedResult === 'HUMAN_REVIEW') {
          state.emailExecutions = state.emailExecutions.filter(
            item => item.id !== action.payload.id
          )

          state.totalCount = Math.max(0, state.totalCount - 1)
        } else {
          state.emailExecutions = state.emailExecutions.map(item =>
            item.id === action.payload.id ? action.payload : item
          )
        }
      })

      .addCase(approveHumanReview.rejected, (state, action) => {
        state.reviewActionLoading = false
        state.error = action.payload
      })

      // REJECT REVIEW
      .addCase(rejectHumanReview.pending, state => {
        state.reviewActionLoading = true
        state.error = null
      })

      .addCase(rejectHumanReview.fulfilled, (state, action) => {
        state.reviewActionLoading = false
        state.reviewDetail = null

        state.emailExecutions = state.emailExecutions.filter(
          item => item.id !== action.payload.reviewId
        )

        state.totalCount = Math.max(0, state.totalCount - 1)
      })

      .addCase(rejectHumanReview.rejected, (state, action) => {
        state.reviewActionLoading = false
        state.error = action.payload
      })

      // FETCH DASHBOARD
      .addCase(fetchEmailAgentDashboard.pending, state => {
        state.dashboardLoading = true
        state.error = null
      })

      .addCase(fetchEmailAgentDashboard.fulfilled, (state, action) => {
        state.dashboardLoading = false

        state.dashboard = action.payload

        if (action.payload?.agent) {
          state.agent = action.payload.agent
        }
      })

      .addCase(fetchEmailAgentDashboard.rejected, (state, action) => {
        state.dashboardLoading = false
        state.error = action.payload
      })
  }
})

export const {
  setCurrentPage,
  setSelectedResult,
  clearReviewDetail,
  clearEmailAgentError
} = emailAgentSlice.actions

export default emailAgentSlice.reducer
