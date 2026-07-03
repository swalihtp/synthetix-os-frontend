import {
  Users,
  ShieldCheck,
  AlertTriangle,
  Clock3,
  ArrowRight
} from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserRegistry } from '../../../store/slices/userRegistrySlice'

function getStatusConfig (status) {
  switch (status) {
    case 'VERIFIED':
      return {
        icon: ShieldCheck,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
      }

    case 'PENDING':
      return {
        icon: Clock3,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20'
      }

    case 'FLAGGED':
      return {
        icon: AlertTriangle,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20'
      }

    default:
      return {
        icon: Users,
        color: 'text-zinc-400',
        bg: 'bg-zinc-500/10',
        border: 'border-zinc-700'
      }
  }
}

export default function UserRegistry () {
  const dispatch = useDispatch()
  const { users, status, error } = useSelector(state => state.userRegistry)

  console.log(users)

  console.log(status)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUserRegistry())
  }, [status, dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>
  return (
    <div className='flex h-full min-h-[700px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 ml-0.5'>
      {' '}
      {/* Header */}
      <div className='flex items-center justify-between border-b border-zinc-800 px-5 py-4'>
        <div className='flex items-center gap-2'>
          <Users size={18} className='text-emerald-400' />

          <h2 className='font-semibold text-white'>User Registry</h2>
        </div>

        <button
          className='
            flex items-center gap-2
            text-sm text-emerald-400
            transition-colors
            hover:text-emerald-300
          '
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>
      {/* User List */}
      <div className='flex-1 overflow-y-auto p-4'>
        {' '}
        <div className='space-y-3'>
          {users.results.map(user => {
            const derivedStatus = user.is_verified
              ? 'VERIFIED'
              : user.role_name === null
              ? 'PENDING'
              : 'FLAGGED'

            const config = getStatusConfig(derivedStatus)

            const Icon = config.icon

            return (
              <div
                key={user.id}
                className='
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-950
                  p-4
                  transition-all
                  duration-200
                  hover:border-zinc-700
                  hover:bg-zinc-900
                '
              >
                {/* Left */}
                <div className='flex items-center gap-3'>
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      ${config.bg}
                    `}
                  >
                    <Icon size={18} className={config.color} />
                  </div>

                  <div>
                    <p className='font-medium text-white'>{user.id}</p>

                    <p className='text-sm text-zinc-500'>{user.email}</p>
                  </div>
                </div>

                {/* Right */}
                <div className='text-right'>
                  <div
                    className={`
                      inline-flex items-center gap-2
                      rounded-full border
                      px-3 py-1
                      text-xs font-medium
                      ${config.border}
                      ${config.color}
                    `}
                  >
                    <span
                      className={`
                        h-2 w-2 rounded-full
                        ${config.bg.replace('/10', '')}
                      `}
                    />

                    {user.status}
                  </div>

                  <p className='mt-2 text-xs text-zinc-500'>
                    {user.created_at}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
