function SectionCard ({ title, icon, children }) {
  const Icon = icon

  return (
    <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
      <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
        <Icon className='text-violet-400' size={18} />
        <h2 className='text-xl font-bold text-white'>{title}</h2>
      </div>
      <div className='p-6'>{children}</div>
    </section>
  )
}

export default SectionCard