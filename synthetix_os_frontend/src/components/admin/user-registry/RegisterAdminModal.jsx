import { useState } from 'react'
import API from '@/api/auth'

export function RegisterAdminModal ({ onClose }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match')
    }

    try {
      setLoading(true)

      await API.post('/system-admin/create-admin/', {
        email: form.email,
        password: form.password
      })

      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div className='w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6'>
        <h2 className='mb-6 text-xl font-semibold text-zinc-100'>
          Register Administrator
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            className='w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-zinc-100'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
            className='w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-zinc-100'
          />

          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            value={form.confirmPassword}
            onChange={handleChange}
            className='w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-zinc-100'
          />

          <div className='flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300'
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={loading}
              className='rounded-xl bg-emerald-500 px-4 py-2 font-medium text-black'
            >
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
