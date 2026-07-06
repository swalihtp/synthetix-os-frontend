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
    <div className='min-h-screen bg-[#050807] text-white flex items-center justify-center px-4 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e22,transparent_35%),radial-gradient(circle_at_bottom_right,#16a34a18,transparent_30%)]' />

      <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[48px_48px] opacity-20' />

      <form
        onSubmit={handleSubmit}
        className='relative z-10 w-full max-w-md rounded-3xl border border-emerald-500/20 bg-[#0b0f14]/80 backdrop-blur-xl shadow-[0_0_60px_rgba(34,197,94,0.12)] p-8 space-y-6'
      >
        <div className='space-y-2 text-center'>
          <div className='mx-auto mb-4 h-14 w-14 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.25)]'>
            <span className='text-2xl font-bold text-emerald-400'>S</span>
          </div>

          <h2 className='text-2xl font-semibold tracking-tight text-white'>
            Verify MFA
          </h2>

          <p className='text-sm text-zinc-400'>
            Enter your 6-digit authentication code to continue.
          </p>
        </div>

        <input
          type='text'
          placeholder='••••••'
          value={otp}
          onChange={e => setOtp(e.target.value)}
          maxLength={6}
          className='w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center text-xl tracking-[0.45em] text-white placeholder:text-zinc-600 outline-none transition focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-500/10'
        />

        <button
          type='submit'
          className='w-full rounded-2xl bg-emerald-500 py-3.5 font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.25)] transition hover:bg-emerald-400 hover:shadow-[0_0_45px_rgba(34,197,94,0.35)] active:scale-[0.98]'
        >
          Verify Code
        </button>

        <p className='text-center text-xs text-zinc-500'>
          Secured by Synthetix OS authentication
        </p>
      </form>
    </div>
  )
}

export default VerifyMFA
