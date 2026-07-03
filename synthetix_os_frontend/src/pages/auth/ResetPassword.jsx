import { useState } from 'react'
import { resetPassword } from '../../api/auth'
import { useParams, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import resetImage from '../../assets/pexels-mikhail-nilov-6964173.jpg'

export default function ResetPassword () {
  const [password, setPassword] = useState('')
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)

      await resetPassword({
        new_password: password,
        uid,
        token
      })

      navigate('/login')
    } catch (err) {
      console.error(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout image={resetImage}>
      <h1 className='text-3xl font-bold'>Reset Password</h1>
      <p className='text-gray-400 mt-2'>Enter your new password</p>

      <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
        <Input
          label='New Password'
          type='password'
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className='w-full bg-emerald-600/10 border border-emerald-500/50 py-4 text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30'
        >
          {loading ? 'UPDATING_PASSWORD...' : 'RESET_PASSWORD'}
        </button>
      </form>
    </AuthLayout>
  )
}
