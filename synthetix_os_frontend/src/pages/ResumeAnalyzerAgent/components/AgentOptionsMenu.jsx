import { useEffect, useRef, useState } from 'react'
import { MoreVertical, Trash2 } from 'lucide-react'

function AgentOptionsMenu ({ onDelete }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside (e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors'
        aria-label='Agent options'
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className='absolute right-0 top-full mt-1 w-36 bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg shadow-black/50 overflow-hidden z-10'>
          <button
            onClick={() => {
              setOpen(false)
              onDelete?.()
            }}
            className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-zinc-900 hover:text-red-300 transition-colors'
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default AgentOptionsMenu
