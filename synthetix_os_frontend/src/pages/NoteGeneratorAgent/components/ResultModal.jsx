
import ResultBadge from './ResultBadge'

function ResultModal ({ result, onClose }) {
  if (!result) return null
  return (
    <div
      className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6'
      onClick={onClose}
    >
      <div
        className='bg-zinc-950 border border-zinc-800 max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-xl font-black text-white'>{result.filename}</h2>
            <div className='mt-1'>
              <ResultBadge style={result.style} />
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-zinc-500 hover:text-white text-sm'
          >
            ✕ Close
          </button>
        </div>
        <div className='space-y-4'>
          {result.sections?.map(s => (
            <div key={s.title}>
              <div className='text-xs uppercase text-zinc-500 mb-1'>
                {s.title}
              </div>
              <div className='text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap'>
                {s.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResultModal