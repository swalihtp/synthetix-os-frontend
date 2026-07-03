function CountBadge ({ count, kind }) {
  if (!count) {
    return <span className='text-sm text-zinc-600'>—</span>
  }

  const variants = {
    tools: 'border-violet-500/15 bg-violet-500/10 text-violet-300',

    integrations: 'border-cyan-500/15 bg-cyan-500/10 text-cyan-300'
  }

  return (
    <span
      className={`inline-flex min-w-8 items-center justify-center rounded-full border px-2.5 py-1 text-xs font-medium ${variants[kind]}`}
    >
      {count}
    </span>
  )
}

export default CountBadge
