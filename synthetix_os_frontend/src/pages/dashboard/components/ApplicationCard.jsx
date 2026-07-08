import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const accentMap = {
  emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  blue: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  amber: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  purple: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  rose: 'text-rose-300 bg-rose-500/10 border-rose-500/20'
}

export default function ApplicationCard ({ application }) {
  const Icon = application.icon || ArrowUpRight

  return (
    <Link
      to={'/system-agents' || '/agents'}
      className='group block rounded-[1.5rem] border border-zinc-800 bg-zinc-950/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-950'
    >
      <div className='mb-4 flex items-start justify-between gap-4'>
        <div
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-2xl border',
            accentMap[application.accent] || accentMap.emerald
          )}
        >
          <Icon size={22} />
        </div>

        <ArrowUpRight
          size={18}
          className='text-zinc-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white'
        />
      </div>

      <h3 className='text-lg font-semibold text-white'>{application.name}</h3>

      <p className='mt-2 line-clamp-2 text-sm leading-6 text-zinc-500'>
        {application.description}
      </p>

      <div className='mt-5 inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300'>
        <span aria-hidden='true'>▣</span>
        {application.total_runs} executions
      </div>
    </Link>
  )
}
