import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('access')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const refreshAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
})

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url.includes('auth/refresh')) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      const refresh = localStorage.getItem('refresh')

      if (!refresh) {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const res = await refreshAPI.post('auth/refresh/', { refresh })

        const newAccess = res.data.access

        localStorage.setItem('access', newAccess)

        API.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newAccess}`

        return API(originalRequest)
      } catch (err) {
        console.log('Refresh token expired')
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default API

// --------------------------------------------------------------

export const registerUser = data => {
  return API.post('auth/register/', data)
}
export const loginUser = data => {
  return API.post('auth/login/', data)
}
export const recoverPassword = data => {
  return API.post('auth/forgot-password/', data)
}
export const resetPassword = data => {
  return API.post('auth/reset-password/', data)
}
export const googleLogin = data => {
  return API.post('auth/auth/google/', data)
}
export const verifyMFA = data => {
  return API.post('auth/mfa/setup/verify/', data)
}
export const verifyMFAAfterEnablingAndAfterFirstLogout = data => {
  return API.post('auth/mfa/login/verify/', data)
}
export const enableMFA = () => {
  return API.post('auth/mfa/enable/')
}
export const disableMFA = data => {
  return API.post('auth/mfa/disable/', data)
}

export const getMyProfile = () => {
  return API.get('auth/me/')
}

export const analyzeResumeExecution = formData => {
  return API.post('/workflows/resume-executions/analyze/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
