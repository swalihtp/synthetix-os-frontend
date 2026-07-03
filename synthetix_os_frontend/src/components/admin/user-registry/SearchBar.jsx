import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export function SearchBar ({ value, onChange }) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange('search', local)
    }, 400)

    return () => clearTimeout(timer)
  }, [local, onChange])

  useEffect(() => {
    setLocal(value)
  }, [value])

  return (
    <div className='group relative w-full max-w-lg'>
      <Search
        size={18}
        className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-400'
      />

      <input
        type='search'
        placeholder='Search by name or email...'
        value={local}
        onChange={e => setLocal(e.target.value)}
        aria-label='Search users'
        className='h-12 w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 pl-12 pr-24 text-sm text-zinc-100 placeholder:text-zinc-500 backdrop-blur-xl outline-none transition-all duration-200 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/10'
      />

      {!local && (
        <kbd className='pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] font-medium text-zinc-500 sm:flex'>
          /
        </kbd>
      )}

      {local && (
        <button
          type='button'
          onClick={() => setLocal('')}
          aria-label='Clear search'
          className='absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition-all duration-200 hover:bg-zinc-800 hover:text-zinc-200'
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
