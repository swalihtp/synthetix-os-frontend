import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '@/api/auth'

export const fetchUserRegistry = createAsyncThunk(
  'userRegistry/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/system-admin/users/')
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

const userRegistrySlice = createSlice({
  name: 'userRegistry',
  initialState: {
    users: {
      count: 0,
      next: null,
      previous: null,
      results: []
    },
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserRegistry.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUserRegistry.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUserRegistry.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default userRegistrySlice.reducer
