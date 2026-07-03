import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, getMyProfile } from '../../api/auth'

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials)
      if (response.data.mfa_required) {
        localStorage.setItem('mfa_user', response.data.user_id)
        localStorage.setItem('mfa_login_flow', true)
      } else {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
      }

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

// Async thunk for register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData)

      // If registration returns tokens, store them
      if (response.data.access) {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
      }

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      )
    }
  }
)

// Async thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      )
    }
  }
)

// Async thunk for getting user profile (if different from current user endpoint)
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getMyProfile()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user profile'
      )
    }
  }
)

const initialState = {
  user: null,
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: !!localStorage.getItem('access'),
  loading: false,
  error: null,
  mfaRequired: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: state => {
      state.user = null
      state.access = null
      state.refresh = null
      state.isAuthenticated = false
      state.mfaRequired = false

      // Clear localStorage
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('user')
    },

    // Update tokens (for token refresh)
    setTokens: (state, action) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
      state.isAuthenticated = true
      // Add this line:
      state.mfaRequired = false

      localStorage.setItem('access', action.payload.access)
      if (action.payload.refresh) {
        localStorage.setItem('refresh', action.payload.refresh)
      }
    },

    // Set MFA required
    setMfaRequired: (state, action) => {
      state.mfaRequired = action.payload
    },

    // Clear error
    clearError: state => {
      state.error = null
    }
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.mfa_required) {
          state.mfaRequired = true
          state.isAuthenticated = false
          return
        }

        state.loading = false
        state.isAuthenticated = true
        state.access = action.payload.access
        state.refresh = action.payload.refresh
        state.user = action.payload.user
        state.mfaRequired = action.payload.mfa_required || false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })

    // Register
    builder
      .addCase(register.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        // If registration auto-logs in
        if (action.payload.access) {
          state.isAuthenticated = true
          state.access = action.payload.access
          state.refresh = action.payload.refresh
          state.user = action.payload.user
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout, setTokens, setMfaRequired, clearError } =
  authSlice.actions

// Selectors
export const selectAuth = state => state.auth
export const selectIsAuthenticated = state => state.auth.isAuthenticated
export const selectUser = state => state.auth.user
export const selectAuthLoading = state => state.auth.loading
export const selectAuthError = state => state.auth.error
export const selectUserRole = state => state.auth.user?.role

export default authSlice.reducer
