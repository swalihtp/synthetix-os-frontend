function BulletList ({ items, emptyLabel = 'None available' }) {
  if (!items || items.length === 0) {
    return <div className='text-zinc-500 text-sm'>{emptyLabel}</div>
  }

  return (
    <ul className='space-y-3'>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className='flex gap-3 text-zinc-300'>
          <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0' />
          <span className='leading-relaxed'>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default BulletList