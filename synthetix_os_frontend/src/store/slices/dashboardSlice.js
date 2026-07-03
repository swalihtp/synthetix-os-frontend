import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dashboardService from '@/services/dashboardService'

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getDashboard()
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          detail: 'Unable to load dashboard.'
        }
      )
    }
  }
)

const initialState = {
  data: null,
  loading: false,
  error: null
}

const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState,

  reducers: {
    clearDashboardError: state => {
      state.error = null
    }
  },

  extraReducers: builder => {
    builder

      .addCase(fetchDashboard.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearDashboardError } = dashboardSlice.actions

export default dashboardSlice.reducer
