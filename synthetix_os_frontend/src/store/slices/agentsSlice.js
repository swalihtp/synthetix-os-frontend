import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAgents,
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
  getBuiltInAgent
} from '../../api/agents'

// Async thunks
export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAgents()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch agents'
      )
    }
  }
)

export const fetchBuiltInAgents = createAsyncThunk(
  'agents/builtin/',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBuiltInAgent()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch built-in agents'
      )
    }
  }
)

export const fetchAgent = createAsyncThunk(
  'agents/fetchAgent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAgent(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch agent'
      )
    }
  }
)

export const addAgent = createAsyncThunk(
  'agents/addAgent',
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await createAgent(agentData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create agent'
      )
    }
  }
)

export const modifyAgent = createAsyncThunk(
  'agents/modifyAgent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateAgent(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update agent'
      )
    }
  }
)

export const removeAgent = createAsyncThunk(
  'agents/removeAgent',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAgent(id)
      return id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete agent'
      )
    }
  }
)

const initialState = {
  items: [],
  builtInItems: [],
  selectedAgent: null,
  loading: false,
  error: null
}

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    clearSelectedAgent: state => {
      state.selectedAgent = null
    },
    clearError: state => {
      state.error = null
    }
  },
  extraReducers: builder => {
    // Fetch all agents
    builder
      .addCase(fetchAgents.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Fetch all built-in agents
    builder
      .addCase(fetchBuiltInAgents.pending, state => {
        state.loading = true
        state.error = null
      })
      // Inside extraReducers for fetchBuiltInAgents.fulfilled
      .addCase(fetchBuiltInAgents.fulfilled, (state, action) => {
        state.loading = false
        state.builtInItems = action.payload.results || action.payload || []
      })
      .addCase(fetchBuiltInAgents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Fetch single agent
    builder
      .addCase(fetchAgent.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAgent.fulfilled, (state, action) => {
        state.loading = false
        state.selectedAgent = action.payload
      })
      .addCase(fetchAgent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Add agent
    builder
      .addCase(addAgent.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Update agent
    builder.addCase(modifyAgent.fulfilled, (state, action) => {
      const index = state.items.findIndex(a => a.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
      if (state.selectedAgent?.id === action.payload.id) {
        state.selectedAgent = action.payload
      }
    })

    // Delete agent
    builder.addCase(removeAgent.fulfilled, (state, action) => {
      state.items = state.items.filter(a => a.id !== action.payload)
      if (state.selectedAgent?.id === action.payload) {
        state.selectedAgent = null
      }
    })
  }
})

export const { clearSelectedAgent, clearError } = agentsSlice.actions

// Selectors
export const selectAgents = state => state.agents.items
export const selectSelectedAgent = state => state.agents.selectedAgent
export const selectAgentsLoading = state => state.agents.loading
export const selectAgentsError = state => state.agents.error

export default agentsSlice.reducer
