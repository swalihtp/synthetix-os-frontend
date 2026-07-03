import { Users, UserX, LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function StatusBadge ({ isActive }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'bg-red-500/10 text-red-400'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? 'bg-emerald-400' : 'bg-red-400'
        }`}
      />

      {isActive ? 'Active' : 'Inactive'}
    </span>
  )
}

function UserRow ({ user }) {
  const navigate = useNavigate()
  const initials =
    user.full_name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? '?'

  const fullName =
    `${user.full_name ?? ''}`.trim() || 'Unnamed User'

  return (
    <tr className='border-b border-zinc-900 transition-colors hover:bg-zinc-900/60' onClick={()=>navigate(`/admin/user-registry/${user.id}`)}>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-4'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-sm font-semibold text-zinc-200'>
            {initials}
          </div>

          <div className='min-w-0'>
            <p className='truncate font-medium text-zinc-100'>{fullName}</p>

            <p className='truncate text-sm text-zinc-500'>{user.email}</p>
          </div>
        </div>
      </td>

      <td className='px-6 py-4'>
        <span className='rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium capitalize text-cyan-300'>
          {user.role_name ?? 'No role'}
        </span>
      </td>

      <td className='px-6 py-4'>
        <StatusBadge isActive={user.is_active?? false} />
      </td>

      <td className='px-6 py-4 text-sm text-zinc-400'>
        {new Date(user.created_at).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}
      </td>
    </tr>
  )
}

export function UserTable ({ users, status }) {


    // When STATE IS LOADING
  if (status === 'loading') {
    return (
      <div className='flex min-h-[320px] flex-col items-center justify-center gap-4'>
        <LoaderCircle className='h-8 w-8 animate-spin text-emerald-400' />

        <p className='text-sm text-zinc-500'>Loading user registry...</p>
      </div>
    )
  }

// WHEN NO USER IS FOUND
  if (users.length === 0) {
    return (
      <div className='flex min-h-[320px] flex-col items-center justify-center gap-4'>
        <div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900'>
          <UserX className='h-8 w-8 text-zinc-500' />
        </div>

        <div className='space-y-1 text-center'>
          <h3 className='font-medium text-zinc-200'>No users found</h3>

          <p className='text-sm text-zinc-500'>
            Try adjusting your search criteria or filters.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-xl cursor-pointer'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[720px]'>
          <thead>
            <tr className='border-b border-zinc-800 bg-zinc-900/70'>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
                User
              </th>

              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
                Role
              </th>

              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
                Status
              </th>

              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>
                Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
