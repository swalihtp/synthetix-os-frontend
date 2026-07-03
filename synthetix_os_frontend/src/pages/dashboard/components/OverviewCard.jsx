import clsx from 'clsx'

const accentStyles = {
  emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  blue: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
  amber: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  rose: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
  purple: 'border-purple-500/20 bg-purple-500/10 text-purple-300'
}

export default function OverviewCard ({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'emerald'
}) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300',
        'border-zinc-800 bg-zinc-950/70 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-950',
        accentStyles[accent]
      )}
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-current opacity-70' />
            <p className='text-xs uppercase tracking-[0.35em] text-zinc-500'>
              {title}
            </p>
          </div>

          <h2 className='mt-4 text-4xl font-semibold tracking-tight text-white'>
            {value ?? 0}
          </h2>

          <p className='mt-2 max-w-[16rem] text-sm leading-6 text-zinc-500'>
            {subtitle}
          </p>
        </div>

        {Icon && (
          <div className={clsx('rounded-2xl border p-3', accentStyles[accent])}>
            <Icon size={20} className='text-current' />
          </div>
        )}
      </div>
    </div>
  )
}
