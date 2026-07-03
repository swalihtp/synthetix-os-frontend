import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getPersona,
  savePersona,
  updatePersona,
  deletePersona,
  getPersonaCompletion,
  getPersonaMetadata
} from '../../api/persona'

// FETCH
export const fetchPersona = createAsyncThunk(
  'persona/fetchPersona',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPersona()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch persona'
      )
    }
  }
)

// SAVE
export const createOrUpdatePersona = createAsyncThunk(
  'persona/createOrUpdatePersona',
  async (data, { rejectWithValue }) => {
    try {
      console.log(data)
      const response = await savePersona(data)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save persona'
      )
    }
  }
)

// PATCH
export const patchPersona = createAsyncThunk(
  'persona/patchPersona',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updatePersona(data)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update persona'
      )
    }
  }
)

export const removePersona = createAsyncThunk(
  'persona/removePersona',
  async (_, { rejectWithValue }) => {
    try {
      await deletePersona()
      return true
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete persona'
      )
    }
  }
)

// COMPLETION
export const fetchPersonaCompletion = createAsyncThunk(
  'persona/fetchPersonaCompletion',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPersonaCompletion()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch completion status'
      )
    }
  }
)

export const fetchPersonaMetadata = createAsyncThunk(
  'persona/fetchPersonaMetadata',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPersonaMetadata()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch metadata'
      )
    }
  }
)

const initialState = {
  data: null,
  completion: 0,
  completed: false,
  loading: false,
  metadata: {},
  error: null
}

const personaSlice = createSlice({
  name: 'persona',
  initialState,

  reducers: {
    clearPersonaError: state => {
      state.error = null
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPersona.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchPersona.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.completion = action.payload.completion_percentage || 0
      })

      .addCase(fetchPersona.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // SAVE
    builder
      .addCase(createOrUpdatePersona.pending, state => {
        state.loading = true
      })

      .addCase(createOrUpdatePersona.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.completion = action.payload.completion_percentage || 0
      })

      .addCase(createOrUpdatePersona.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // PATCH
    builder.addCase(patchPersona.fulfilled, (state, action) => {
      state.data = action.payload
      state.completion = action.payload.completion_percentage || 0
    })

    // DELETE
    builder.addCase(removePersona.fulfilled, state => {
      state.data = null
      state.completion = 0
      state.completed = false
    })

    // COMPLETION
    builder.addCase(fetchPersonaCompletion.fulfilled, (state, action) => {
      state.completed = action.payload.completed
      state.completion = action.payload.completion_percentage
    })

    //  METADATA
    builder.addCase(fetchPersonaMetadata.fulfilled, (state, action) => {
      state.metadata = action.payload
    })
  }
})

export const { clearPersonaError } = personaSlice.actions

// SELECTORS
export const selectPersona = state => state.persona.data

export const selectPersonaLoading = state => state.persona.loading

export const selectPersonaError = state => state.persona.error

export const selectPersonaCompletion = state => state.persona.completion

export const selectPersonaMetadata = state => state.persona.metadata

export default personaSlice.reducer
