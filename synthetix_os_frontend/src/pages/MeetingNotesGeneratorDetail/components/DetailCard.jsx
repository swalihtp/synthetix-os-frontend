function DetailCard ({ title, value, subtitle, icon }) {
  const Icon = icon

  return (
    <div className='bg-zinc-900/50 border border-zinc-800 p-5'>
      <div className='flex items-center justify-between mb-4'>
        <Icon className='text-violet-400' size={18} />
        <span className='text-[10px] uppercase text-zinc-600'>metadata</span>
      </div>
      <h3 className='text-sm text-white font-semibold break-words'>{value}</h3>
      <p className='text-zinc-500 text-sm mt-2'>{title}</p>
      {subtitle ? <p className='text-zinc-600 text-xs mt-2'>{subtitle}</p> : null}
    </div>
  )
}

export default DetailCard