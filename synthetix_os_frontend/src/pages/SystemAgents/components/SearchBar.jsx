import { Search } from 'lucide-react'

export default function SearchBar ({ value, onChange }) {
  return (
    <div className='relative'>
      <Search
        size={18}
        className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
      />

      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder='Search system agents...'
        className='
          w-full
          bg-zinc-900/40
          border
          border-zinc-800
          pl-12
          pr-4
          py-3
          text-white
          outline-none
          placeholder:text-zinc-600
          focus:border-emerald-500
          transition-all
        '
      />
    </div>
  )
}
