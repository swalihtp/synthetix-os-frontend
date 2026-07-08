import { Users } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function AdminCard () {
  const user = useSelector(state => state.auth.user)

  if (user.role !== 'Admin') return null

  return (
    <div className='rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6'>
      <div className='flex items-start gap-4'>
        <div className='rounded-2xl bg-zinc-800 p-3'>
          <Users className='h-5 w-5 text-violet-400' />
        </div>

        <div>
          <h3 className='font-medium text-zinc-100'>Administration</h3>

          <p className='mt-2 text-sm text-zinc-500'>
            Manage users, roles, and permissions.
          </p>

          <button className='mt-4 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-400'>
            Open Admin Console
          </button>
        </div>
      </div>
    </div>
  )
}
