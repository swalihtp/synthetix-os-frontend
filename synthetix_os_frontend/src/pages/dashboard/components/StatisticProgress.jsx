import clsx from 'clsx'

const colors = {
  emerald: {
    bar: 'bg-emerald-500',
    text: 'text-emerald-400'
  },
  blue: {
    bar: 'bg-blue-500',
    text: 'text-blue-400'
  },
  red: {
    bar: 'bg-red-500',
    text: 'text-red-400'
  }
}

export default function StatisticProgress ({
  label,
  value,
  total,
  color = 'emerald'
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-zinc-400'>{label}</span>

        <span className={clsx('font-semibold', colors[color].text)}>
          {value}
        </span>
      </div>

      <div className='h-2 overflow-hidden rounded-full bg-zinc-800'>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-700',
            colors[color].bar
          )}
          style={{
            width: `${percentage}%`
          }}
        />
      </div>
    </div>
  )
}
