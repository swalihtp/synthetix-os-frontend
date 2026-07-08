import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  login,
  clearError,
  selectAuth,
  fetchUserProfile,
  selectUser
} from '../../store/slices/authSlice'
import { Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'

function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(selectUser)

  const { loading, error, isAuthenticated, mfaRequired } =
    useSelector(selectAuth)

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (!isAuthenticated || mfaRequired || !user) return

    const defaultRoute = user.role === 'system_admin' ? '/admin' : '/dashboard'

    navigate(defaultRoute, { replace: true })
  }, [isAuthenticated, mfaRequired, user, navigate, location])

  useEffect(() => {
    if (mfaRequired) {
      navigate('/verify-mfa')
    }
  }, [mfaRequired, navigate])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const result = await dispatch(login(credentials))

    if (login.fulfilled.match(result)) {
      const { mfa_required } = result.payload

      if (!mfa_required) {
        await dispatch(fetchUserProfile())
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050505] font-mono p-6'>
      <div className='w-full max-w-md border border-zinc-900 bg-zinc-900/10 p-10 relative'>
        {/* Decorative corner */}
        <div className='absolute top-0 right-0 w-12 h-12 border-t border-r border-emerald-500/30' />

        <div className='flex items-center gap-3 mb-8'>
          <Terminal className='text-emerald-500' size={20} />
          <h1 className='text-xl font-black text-white uppercase tracking-tighter'>
            Access_Terminal
          </h1>
        </div>

        {error && (
          <div className='mb-6 p-3 border border-red-900/50 bg-red-950/10 text-red-500 text-[10px] uppercase tracking-widest flex items-center gap-3'>
            <div className='w-1.5 h-1.5 bg-red-500 animate-pulse' />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-1'>
            <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
              User_Identifier
            </label>
            <input
              name='email'
              type='email'
              value={credentials.email}
              onChange={handleChange}
              className='w-full bg-black border border-zinc-800 p-3 text-sm text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-800'
              placeholder='ENTER_EMAIL...'
            />
          </div>

          <div className='space-y-1'>
            <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
              Access_Key
            </label>
            <input
              name='password'
              type='password'
              value={credentials.password}
              onChange={handleChange}
              className='w-full bg-black border border-zinc-800 p-3 text-sm text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors'
            />
          </div>

          <button
            disabled={loading}
            className='w-full bg-emerald-600/10 border border-emerald-500/50 py-4 text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30'
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHORIZE_ACCESS'}
          </button>
        </form>

        <div className='mt-8 flex justify-between border-t border-zinc-900 pt-6'>
          <Link
            to='/recover-password'
            className='text-[9px] text-zinc-600 uppercase hover:text-zinc-400 transition tracking-widest'
          >
            _forgot_pass
          </Link>
          <Link
            to='/register'
            className='text-[9px] text-zinc-600 uppercase hover:text-zinc-400 transition tracking-widest'
          >
            _create_account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
