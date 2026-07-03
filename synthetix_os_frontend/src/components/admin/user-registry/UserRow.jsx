import Avatar from './Avatar'
import Badge from './Badge'
import { formatDate } from '@/utils/userHelpers'

export default function UserRow ({ user, index }) {
  return (
    <tr className='border-b border-gray-200 hover:bg-gray-50'>
      <td className='p-4'>
        <div className='flex items-center gap-3'>
          <Avatar user={user} index={index} />

          <div>
            <p
              className={
                user.full_name ? ' text-zinc-600 font-medium' : 'italic text-zinc-600'
              }
            >
              {user.full_name || 'No name'}
            </p>

            <p className='text-xs text-gray-500'>{user.email}</p>
          </div>
        </div>
      </td>

      <td className='p-4'>
        {user.role_name ? (
          <Badge variant='role'>{user.role_name}</Badge>
        ) : (
          <Badge variant='norole'>No role</Badge>
        )}
      </td>

      <td className='p-4'>
        <Badge variant={user.is_verified ? 'verified' : 'unverified'}>
          {user.is_verified ? 'Verified' : 'Unverified'}
        </Badge>
      </td>

      <td className='p-4'>
        {user.mfa_enabled ? (
          <Badge variant='mfa'>Enabled</Badge>
        ) : (
          <span className='text-gray-400'>—</span>
        )}
      </td>

      <td className='p-4 text-sm text-gray-500'>
        {formatDate(user.created_at)}
      </td>
    </tr>
  )
}
