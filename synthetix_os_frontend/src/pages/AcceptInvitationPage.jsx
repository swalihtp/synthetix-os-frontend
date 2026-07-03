import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import API from '@/api/auth'

// import { acceptInvitation } from '@/services/authService'

export default function AcceptInvitationPage () {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = useMemo(() => searchParams.get('token'), [searchParams])

  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

 const acceptInvitation = payload => {
  return API.post('/system-admin/accept-invite/', payload)
}

  const handleSubmit = async e => {
    e.preventDefault()

    setError('')

    if (!token) {
      setError('Invalid invitation link.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)

      await acceptInvitation({
        token,
        password: form.password
      })

      navigate('/login', {
        replace: true,
        state: {
          message: 'Password created successfully. Please sign in.'
        }
      })
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.token?.[0] ||
          'Failed to accept invitation.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-950 px-4'>
      <div className='w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 backdrop-blur-xl'>
        <div className='mb-8'>
          <h1 className='text-2xl font-semibold text-zinc-100'>
            Create Your Password
          </h1>

          <p className='mt-2 text-sm text-zinc-400'>
            Set a password to activate your administrator account.
          </p>
        </div>

        {error && (
          <div className='mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='mb-2 block text-sm text-zinc-300'>Password</label>

            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className='w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition focus:border-emerald-500'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm text-zinc-300'>
              Confirm Password
            </label>

            <input
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className='w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition focus:border-emerald-500'
            />
          </div>

          <button
            type='submit'
            disabled={loading || !token}
            className='w-full rounded-2xl bg-emerald-500 px-4 py-3 font-medium text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? 'Creating Password...' : 'Activate Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
