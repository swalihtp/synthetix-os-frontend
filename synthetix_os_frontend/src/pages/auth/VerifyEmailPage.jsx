import React, { useState } from 'react'
import { ShieldCheck, Terminal } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '@/api/auth'

function VerifyEmailPage () {
  const navigate = useNavigate()
  const location = useLocation()

  const email = new URLSearchParams(location.search).get('email') || ''

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resending, setResending] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      await API.post('/auth/verify-email/', {
        email,
        otp
      })

      setSuccess('IDENTITY_VERIFIED')

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.detail || 'INVALID_VERIFICATION_CODE')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setResending(true)
      setError('')

      const response = await API.post('/auth/resend-verification/', {
        email
      })

      setSuccess(response.data.message || 'NEW_VERIFICATION_CODE_SENT')
    } catch (err) {
      setError(err.response?.data?.detail || 'FAILED_TO_RESEND_CODE')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050505] font-mono p-6'>
      <div className='w-full max-w-md border border-zinc-900 bg-zinc-900/10 p-10 relative'>
        {/* Decorative corner */}
        <div className='absolute top-0 right-0 w-12 h-12 border-t border-r border-emerald-500/30' />

        <div className='flex items-center gap-3 mb-8'>
          <ShieldCheck className='text-emerald-500' size={20} />
          <h1 className='text-xl font-black text-white uppercase tracking-tighter'>
            Verification_Terminal
          </h1>
        </div>

        <p className='text-[10px] text-zinc-500 uppercase tracking-widest mb-6'>
          Confirm your identity to activate access.
        </p>

        {email && (
          <div className='mb-6 border border-zinc-800 bg-black p-3'>
            <div className='text-[9px] text-zinc-600 uppercase tracking-widest mb-1'>
              User_Identifier
            </div>
            <div className='text-emerald-500 text-sm break-all'>{email}</div>
          </div>
        )}

        {error && (
          <div className='mb-6 p-3 border border-red-900/50 bg-red-950/10 text-red-500 text-[10px] uppercase tracking-widest flex items-center gap-3'>
            <div className='w-1.5 h-1.5 bg-red-500 animate-pulse' />
            {error}
          </div>
        )}

        {success && (
          <div className='mb-6 p-3 border border-emerald-900/50 bg-emerald-950/10 text-emerald-500 text-[10px] uppercase tracking-widest flex items-center gap-3'>
            <div className='w-1.5 h-1.5 bg-emerald-500 animate-pulse' />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-1'>
            <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
              Verification_Code
            </label>

            <input
              type='text'
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              className='w-full bg-black border border-zinc-800 p-3 text-center text-xl tracking-[0.5em] text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors'
              placeholder='******'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-emerald-600/10 border border-emerald-500/50 py-4 text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30'
          >
            {loading ? 'VERIFYING...' : 'VERIFY_IDENTITY'}
          </button>
        </form>

        <div className='mt-8 border-t border-zinc-900 pt-6 flex justify-center'>
          <button
            type='button'
            onClick={handleResendCode}
            disabled={resending}
            className='text-[9px] text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition disabled:opacity-40'
          >
            {resending ? '_sending_new_code' : '_resend_code'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
