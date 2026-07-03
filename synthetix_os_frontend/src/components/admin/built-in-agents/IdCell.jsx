import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function IdCell ({ id }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1200)
    } catch (error) {
      console.error('Failed to copy ID:', error)
    }
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      title={id}
      className='group inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 font-mono text-xs text-zinc-500 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.03] hover:text-zinc-300'
    >
      <span>{id.slice(0, 8)}...</span>

      {copied ? (
        <Check size={14} className='text-emerald-400' />
      ) : (
        <Copy
          size={14}
          className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'
        />
      )}
    </button>
  )
}

export default IdCell
