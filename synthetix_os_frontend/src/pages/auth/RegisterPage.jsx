import { useState } from 'react'
import { registerUser } from '../../api/auth'
import AuthLayout from '../../components/layout/AuthLayout'
import registerImage from '../../assets/3d-rendering-hand-shake.jpg'
import { useNavigate } from 'react-router-dom'
export default function RegisterPage () {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await registerUser(formData)

      setSuccess(response.data.message)


    } catch (err) {
      alert(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout image={registerImage}>
      <h1 className='text-3xl font-bold'>Create Account</h1>
      <p className='text-gray-400 mt-2'>Start building your AI workforce</p>

      {success && (
        <div className='mb-6 p-3 border border-emerald-900/50 bg-emerald-950/10 text-emerald-500 text-[10px] uppercase tracking-widest flex items-center gap-3'>
          <div className='w-1.5 h-1.5 bg-emerald-500 animate-pulse' />
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-1'>
          <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
            User_Name
          </label>
          <input
            name='full_name'
            value={formData.full_name}
            onChange={handleChange}
            className='w-full bg-black border border-zinc-800 p-3 text-sm text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors'
            placeholder='ENTER_FULL_NAME...'
          />
        </div>

        <div className='space-y-1'>
          <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
            User_Identifier
          </label>
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full bg-black border border-zinc-800 p-3 text-sm text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-800'
            placeholder='ENTER_EMAIL...'
          />
        </div>

        <div className='space-y-1'>
          <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
            Access_Key <span className='text-zinc-500'>(Password)</span>
          </label>
          <input
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full bg-black border border-zinc-800 p-3 text-sm text-emerald-500 focus:outline-none focus:border-emerald-500 transition-colors'
            placeholder='CREATE_ACCESS_KEY...'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-emerald-600/10 border border-emerald-500/50 py-4 text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'INITIALIZING_ACCOUNT...' : 'INITIALIZE_ACCOUNT'}
        </button>
      </form>
    </AuthLayout>
  )
}
