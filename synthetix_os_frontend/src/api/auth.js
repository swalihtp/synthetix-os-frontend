import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('access')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
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
      originalRequest._retry = true

      try {
        const refresh = localStorage.getItem('refresh')

        const res = await axios.post(
          'http://127.0.0.1:8000/api/token/refresh/',
          { refresh }
        )

        const newAccess = res.data.access

        localStorage.setItem('access', newAccess)

        API.defaults.headers.Authorization = `Bearer ${newAccess}`
        originalRequest.headers.Authorization = `Bearer ${newAccess}`

        return API(originalRequest)
      } catch (err) {
        console.log('Refresh token expired')
        localStorage.clear()
        window.location.href = '/login'
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
export const verifyMFA = (data) => {
  return API.post('auth/mfa/login/verify/', data)
}
export const enableMFA = () => {
  return API.post('auth/mfa/enable/')
}
