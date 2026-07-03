import { ArrowRight, FileText, MessageSquareQuote, CheckSquare, ListTodo } from 'lucide-react'
import ResultBadge from './ResultBadge'

function ExecutionRow ({ execution, onView }) {
  return (
    <div className='p-6 hover:bg-zinc-900 transition-all'>
      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-3 flex-wrap mb-2'>
            <span className='text-white font-semibold flex items-center gap-2'>
              <FileText size={14} className='text-zinc-500' />
              {execution.filename}
            </span>
            <ResultBadge style={execution.summaryStyle} />
            {execution.status && (
              <span className='text-[10px] px-2 py-1 border border-violet-500/20 text-violet-400 bg-violet-500/10 uppercase'>
                {execution.status}
              </span>
            )}
          </div>
          <div className='flex flex-wrap items-center gap-4 text-xs'>
            <span className='flex items-center gap-1.5 text-violet-400'>
              <MessageSquareQuote size={11} /> {execution.topicsCount} topics
            </span>
            <span className='flex items-center gap-1.5 text-emerald-400'>
              <CheckSquare size={11} /> {execution.decisionsCount} decisions
            </span>
            <span className='flex items-center gap-1.5 text-orange-400'>
              <ListTodo size={11} /> {execution.actionItemsCount} action items
            </span>
          </div>
        </div>
        <div className='flex items-center gap-6 shrink-0'>
          <div className='text-right'>
            <div className='text-[10px] text-zinc-600 uppercase'>processed</div>
            <div className='text-sm text-zinc-300 mt-1'>
              {new Date(execution.time).toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => onView(execution)}
            className='flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:border-violet-500 hover:text-violet-400 transition-all text-sm'
          >
            View <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExecutionRow
