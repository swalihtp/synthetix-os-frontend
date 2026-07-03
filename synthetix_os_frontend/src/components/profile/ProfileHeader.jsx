import { ShieldCheck, ShieldAlert } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function ProfileHeader () {
  const user = useSelector(state => state.auth.user)

  return (
    <div className='rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-8 backdrop-blur-xl'>
      <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
        <div className='relative'>
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-lg' />

          <img
            src={user.profile_image || '/avatar-placeholder.png'}
            alt={user.full_name}
            className='relative h-24 w-24 rounded-3xl border border-zinc-700 object-cover'
          />
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-3'>
            <h2 className='truncate text-3xl font-semibold tracking-tight text-zinc-100'>
              {user.full_name}
            </h2>

            <span className='rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-violet-300'>
              {user.role}
            </span>

            {user.is_verified ? (
              <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400'>
                <ShieldCheck size={14} />
                Verified
              </span>
            ) : (
              <span className='inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400'>
                <ShieldAlert size={14} />
                Unverified
              </span>
            )}
          </div>

          <p className='mt-3 text-sm text-zinc-500'>{user.email}</p>

          <div className='mt-5 flex flex-wrap gap-6 border-t border-zinc-800/80 pt-5'>
            <div>
              <p className='text-xs uppercase tracking-wide text-zinc-600'>
                Account Status
              </p>

              <p className='mt-1 text-sm font-medium text-zinc-300'>
                {user.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>

            <div>
              <p className='text-xs uppercase tracking-wide text-zinc-600'>
                MFA
              </p>

              <p className='mt-1 text-sm font-medium text-zinc-300'>
                {user.mfa_enabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
