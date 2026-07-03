import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import API from '@/api/auth'
// ─── API ─────────────────────────────────────────────────────────────────────

async function fetchAdminEmailActivityApi (params = {}) {
  const query = new URLSearchParams()

  if (params.limit) query.set('limit', params.limit)
  if (params.result) query.set('result', params.result)
  if (params.agentId) query.set('agent_id', params.agentId)
  if (params.since) query.set('since', params.since)
  if (params.days != null) query.set('days', params.days)
  if (params.intent) query.set('intent', params.intent)
  if (params.minConfidence) {
    query.set('min_confidence', params.minConfidence)
  }

  console.log(params);
  

  const url = `/system-admin/email-activity/?${query.toString()}`

  const response = await API.get(url)

  return response.data
}

export const fetchEmailActivityStream = createAsyncThunk(
  'emailActivityStream/fetch',
  async ({ params = {} } = {}, { rejectWithValue }) => {
    try {
      return await fetchAdminEmailActivityApi(params)
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch activity stream')
    }
  }
)

const initialState = {
  since: null,
  count: 0,
  activities: [], // EmailExecution[]

  loading: false,
  error: null,

  // Mirrors AdminEmailActivityStreamView query params
  filters: {
    result: null, // 'AUTO_RESOLVED'|'HUMAN_REVIEW'|'SKIPPED'|'FAILED'|null
    agentId: null, // uuid string | null — optional single-agent drill-down
    intent: null, // string partial match | null
    minConfidence: null, // 0–1 float | null
    days: 7,
    limit: 4
  }
}

// ─── Slice ───────────────────────────────────────────────────────────────────

const emailActivityStreamSlice = createSlice({
  name: 'emailActivityStream',
  initialState,
  reducers: {
    /** Filter by EmailExecution.result ('AUTO_RESOLVED'|'HUMAN_REVIEW'|'SKIPPED'|'FAILED'|null). */
    setResultFilter (state, action) {
      state.filters.result = action.payload
    },

    /** Narrow stream to a single agent by UUID (null = all agents). */
    setAgentFilter (state, action) {
      state.filters.agentId = action.payload
    },

    /** Partial-match filter on EmailExecution.detected_intent. */
    setIntentFilter (state, action) {
      state.filters.intent = action.payload
    },

    /** Minimum EmailExecution.confidence_score (0–1 float). */
    setMinConfidence (state, action) {
      state.filters.minConfidence = action.payload
    },

    /** Lookback window in days (overridden by `since` if set). */
    setDays (state, action) {
      state.filters.days = action.payload
    },

    /** Max results returned (backend cap: 100). */
    setLimit (state, action) {
      state.filters.limit = Math.min(action.payload, 100)
    },

    /** Reset all filters to defaults. */
    resetFilters (state) {
      state.filters = initialState.filters
    },

    clearError (state) {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmailActivityStream.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmailActivityStream.fulfilled, (state, action) => {
        state.loading = false
        state.count = action.payload.count
        state.since = action.payload.since
        state.activities = action.payload.activities
      })
      .addCase(fetchEmailActivityStream.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

// ─── Actions ─────────────────────────────────────────────────────────────────

export const {
  setResultFilter,
  setAgentFilter,
  setIntentFilter,
  setMinConfidence,
  setDays,
  setLimit,
  resetFilters,
  clearError
} = emailActivityStreamSlice.actions

// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectActivityStream = state => state.emailActivityStream
export const selectActivities = state => state.emailActivityStream.activities
export const selectActivityLoading = state => state.emailActivityStream.loading
export const selectActivityError = state => state.emailActivityStream.error
export const selectActivityCount = state => state.emailActivityStream.count
export const selectActivitySince = state => state.emailActivityStream.since
export const selectActivityFilters = state => state.emailActivityStream.filters

export const selectActivityCounts = state => {
  const counts = { AUTO_RESOLVED: 0, HUMAN_REVIEW: 0, SKIPPED: 0, FAILED: 0 }
  for (const a of state.emailActivityStream.activities) {
    if (a.result in counts) counts[a.result]++
  }
  return counts
}

export const selectAvgConfidence = state => {
  const scored = state.emailActivityStream.activities.filter(
    a => a.confidence_score != null
  )
  if (!scored.length) return null
  return scored.reduce((sum, a) => sum + a.confidence_score, 0) / scored.length
}

export const selectActiveAgents = state => {
  const seen = new Map()
  for (const a of state.emailActivityStream.activities) {
    if (a.agent && !seen.has(a.agent.id)) {
      seen.set(a.agent.id, a.agent)
    }
  }
  return Array.from(seen.values())
}

export default emailActivityStreamSlice.reducer
