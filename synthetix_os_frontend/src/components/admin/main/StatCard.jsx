import React from 'react'

export default function StatCard ({
  label,
  value = 0,
  badge,
  badgeColor = 'text-zinc-400',
  progress = 50,
  barColor = 'bg-emerald-400',
  icon: Icon,
  iconClass = '',
  barAnimate = false
}) {
  const safeProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div
      className='
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-5
        transition-all
        duration-300
        hover:border-zinc-700
        hover:bg-zinc-900/80
      '
    >
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <span className='text-xs font-medium uppercase tracking-wider text-zinc-500'>
          {label}
        </span>

        <div className='flex items-center gap-2'>
          {badge && (
            <span className={`text-xs font-medium ${badgeColor}`}>{badge}</span>
          )}

          {Icon && (
            <Icon
              size={16}
              aria-hidden='true'
              className={`text-zinc-400 ${iconClass}`}
            />
          )}
        </div>
      </div>

      {/* Value */}
      <h3
        className='mb-4 truncate text-3xl font-bold text-white'
        title={String(value)}
      >
        {value}
      </h3>

      {/* Progress */}
      <div className='h-2 overflow-hidden rounded-full bg-zinc-800'>
        <div
          style={{ width: `${safeProgress}%` }}
          className={`
            h-full
            rounded-full
            transition-all
            duration-500
            ${barColor}
            ${barAnimate ? 'animate-pulse' : ''}
          `}
        />
      </div>
    </div>
  )
}
