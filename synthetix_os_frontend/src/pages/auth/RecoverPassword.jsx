import React, { useState } from 'react'
import { recoverPassword } from '../../api/auth'
import { Terminal } from 'lucide-react'

export default function RecoverPassword () {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await recoverPassword({ email })

      setMessage(res.data.message)
    } catch (err) {
      console.error(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050505] font-mono p-6'>
      <div className='w-full max-w-md border border-zinc-900 bg-zinc-900/10 p-10 relative'>
        <div className='absolute top-0 right-0 w-12 h-12 border-t border-r border-emerald-500/30' />

        <div className='flex items-center gap-3 mb-8'>
          <Terminal className='text-emerald-500' size={20} />
          <h1 className='text-xl font-black text-white uppercase tracking-tighter'>
            Recover_Access
          </h1>
        </div>

        {message && (
          <div className='mb-6 p-3 border border-emerald-900/50 bg-emerald-950/10 text-emerald-500 text-[10px] uppercase tracking-widest'>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold'>
              User_Email
            </label>

            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full bg-black border border-zinc-800 p-3 text-sm text-emerald-500 focus:outline-none focus:border-emerald-500'
            />
          </div>

          <button
            disabled={loading}
            className='w-full bg-emerald-600/10 border border-emerald-500/50 py-4 text-emerald-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30'
          >
            {loading ? 'SENDING_LINK...' : 'SEND_RESET_LINK'}
          </button>
        </form>
      </div>
    </div>
  )
}
