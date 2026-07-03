import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  verifyMFA,
  verifyMFAAfterEnablingAndAfterFirstLogout
} from '../../api/auth'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchUserProfile, setTokens } from '@/store/slices/authSlice'

function VerifyMFA () {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  const handleSubmit = async e => {
    e.preventDefault()

    const user_id = localStorage.getItem('mfa_user')

    let res = null

    const isLoginFlow = localStorage.getItem('mfa_login_flow') === 'true'

    if (isLoginFlow) {
      res = await verifyMFAAfterEnablingAndAfterFirstLogout({ user_id, otp })

      // 1. Dispatch setTokens FIRST — this updates Redux auth state
      dispatch(
        setTokens({
          access: res.data.access,
          refresh: res.data.refresh
        })
      )

      // 2. Then fetch the profile (Axios will now have valid tokens in state)
      const profileResult = await dispatch(fetchUserProfile())
      const profile = profileResult.payload

      // 3. Navigate based on role
      if (profile.role === 'system_admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
      return
    } else {
      res = await verifyMFA({
        user_id,
        otp
      })
    }

    if (user.role == 'system_admin') {
      navigate('/admin/profile')
      return
    } else if (user.role == 'user') {
      navigate('/profile')
      return
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-xl font-semibold text-white'>Enter MFA Code</h2>

      <input
        type='text'
        placeholder='Enter 6-digit code'
        value={otp}
        onChange={e => setOtp(e.target.value)}
        className='w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 
                   text-center tracking-widest text-lg'
      />

      <button
        type='submit'
        className='w-full bg-linear-to-r from-purple-500 to-blue-500 
                   py-2 rounded-xl font-semibold hover:opacity-90 transition'
      >
        Verify
      </button>
    </form>
  )
}

export default VerifyMFA
