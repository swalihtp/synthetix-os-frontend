import clsx from 'clsx'
import { Link } from 'react-router-dom'

const accents = {
  emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  blue: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  amber: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  purple: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  rose: 'text-rose-300 bg-rose-500/10 border-rose-500/20'
}

export default function QuickActionCard ({ action }) {
  const Icon = action.icon

  return (
    <Link
      to={action.route}
      className='flex items-center gap-3 rounded-xl border border-transparent bg-zinc-900/60 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-900'
    >
      <div className={clsx('rounded-xl border p-3', accents[action.accent])}>
        <Icon size={18} />
      </div>

      <span className='text-sm font-medium text-white'>{action.title}</span>
    </Link>
  )
}
