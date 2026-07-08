import { useState } from 'react'
import { ChevronRight, KeyRound, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { disableMFA } from '../../api/auth'
import { fetchUserProfile } from '@/store/slices/authSlice'

export default function SecurityCard () {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDisableForm, setShowDisableForm] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDisableMFA = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await disableMFA({ otp })
      await dispatch(fetchUserProfile()).unwrap()

      setOtp('')
      setShowDisableForm(false)
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to disable MFA'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-6 backdrop-blur-xl transition-colors hover:border-zinc-700'>
      <div className='flex items-start gap-4'>
        <div className='rounded-2xl border border-zinc-800 bg-zinc-900 p-3'>
          <KeyRound className='h-5 w-5 text-violet-400' />
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h3 className='text-base font-semibold text-zinc-100'>
                Multi-factor Authentication
              </h3>

              <p className='mt-2 text-sm leading-relaxed text-zinc-500'>
                Add an extra layer of protection to your account by requiring a
                verification step during sign-in.
              </p>
            </div>

            {user.mfa_enabled ? (
              <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'>
                <ShieldCheck className='h-3.5 w-3.5' />
                Enabled
              </span>
            ) : (
              <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400'>
                <ShieldAlert className='h-3.5 w-3.5' />
                Disabled
              </span>
            )}
          </div>

          <div className='mt-6 border-t border-zinc-800 pt-5'>
            {user.mfa_enabled ? (
              <>
                {!showDisableForm ? (
                  <button
                    type='button'
                    onClick={() => setShowDisableForm(true)}
                    className='inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200'
                  >
                    Manage MFA
                    <ChevronRight className='h-4 w-4' />
                  </button>
                ) : (
                  <form onSubmit={handleDisableMFA} className='space-y-4'>
                    <div className='space-y-2'>
                      <label className='text-xs font-medium uppercase tracking-[0.2em] text-zinc-500'>
                        Enter OTP to disable MFA
                      </label>

                      <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        maxLength={6}
                        placeholder='123456'
                        className='w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10'
                      />
                    </div>

                    {error && (
                      <p className='text-sm text-red-400'>
                        {error}
                      </p>
                    )}

                    <div className='flex flex-wrap gap-3'>
                      <button
                        type='button'
                        onClick={() => {
                          setShowDisableForm(false)
                          setOtp('')
                          setError('')
                        }}
                        className='inline-flex items-center gap-2 rounded-2xl border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200'
                      >
                        Cancel
                      </button>

                      <button
                        type='submit'
                        disabled={loading || otp.length < 6}
                        className='inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50'
                      >
                        {loading && <Loader2 className='h-4 w-4 animate-spin' />}
                        {loading ? 'Disabling...' : 'Disable MFA'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <button
                type='button'
                className='inline-flex items-center gap-2 rounded-2xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-violet-400'
                onClick={() => navigate('/mfa-setup')}
              >
                Enable MFA
                <ChevronRight className='h-4 w-4' />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
