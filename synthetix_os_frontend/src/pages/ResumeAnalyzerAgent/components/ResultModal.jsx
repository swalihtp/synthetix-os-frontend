import { X } from 'lucide-react'
import ScoreMeter from './ScoreMeter'

function ResultModal ({ result, onClose }) {
  if (!result) return null

  return (
    <div
      className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6'
      onClick={onClose}
    >
      <div
        className='bg-zinc-950 border border-zinc-800 max-w-2xl w-full max-h-[85vh] overflow-y-auto'
        onClick={e => e.stopPropagation()}
      >
        <div className='sticky top-0 bg-zinc-950 border-b border-zinc-800 p-6 flex items-start justify-between gap-4'>
          <div>
            <h2 className='text-xl font-black text-white'>{result.filename}</h2>
            <div className='flex items-center gap-2 mt-2 text-xs text-zinc-500'>
              <span>Status: {result.status}</span>
              <span>•</span>
              <span>{new Date(result.time).toLocaleString()}</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <ScoreMeter score={result.score} />
            <button
              onClick={onClose}
              className='text-zinc-500 hover:text-white mt-1'
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-3 divide-x divide-zinc-800 border-b border-zinc-800'>
          <div className='p-4 text-center'>
            <div className='text-emerald-400 font-black text-xl'>
              {result.extractedSkillsCount}
            </div>
            <div className='text-xs text-zinc-500 mt-1'>Extracted Skills</div>
          </div>
          <div className='p-4 text-center'>
            <div className='text-red-400 font-black text-xl'>
              {result.atsIssuesCount}
            </div>
            <div className='text-xs text-zinc-500 mt-1'>ATS Issues</div>
          </div>
          <div className='p-4 text-center'>
            <div className='text-yellow-400 font-black text-xl'>
              {result.skillGapsCount}
            </div>
            <div className='text-xs text-zinc-500 mt-1'>Skill Gaps</div>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {result.sections?.map(s => (
            <div key={s.title}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-1 h-4 bg-sky-500' />
                <span className='text-xs uppercase text-zinc-400 font-semibold tracking-wider'>
                  {s.title}
                </span>
              </div>
              <div className='text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap pl-3'>
                {s.content}
              </div>
            </div>
          ))}
          {result.rawText ? (
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-1 h-4 bg-zinc-600' />
                <span className='text-xs uppercase text-zinc-400 font-semibold tracking-wider'>
                  Raw Text Preview
                </span>
              </div>
              <div className='text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap pl-3 max-h-72 overflow-y-auto'>
                {result.rawText}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ResultModal
