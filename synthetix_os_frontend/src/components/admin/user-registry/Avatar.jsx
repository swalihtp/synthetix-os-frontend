import { AVATAR_COLORS } from '@/constants/avatarColors'
import { getInitials } from '@/utils/userHelpers'

export default function Avatar ({ user, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]

  return (
    <div
      className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold'
      style={{
        backgroundColor: color.bg,
        color: color.fg
      }}
    >
      {getInitials(user.full_name, user.email)}
    </div>
  )
}
