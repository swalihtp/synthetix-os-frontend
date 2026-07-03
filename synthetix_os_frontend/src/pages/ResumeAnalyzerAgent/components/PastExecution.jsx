import ExecutionRow from './ExecutionRow'
import { Clock, FileText, Loader2 } from 'lucide-react'

function PastExecutions ({ executions, onView, loading = false }) {
  return (
    <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
      <div className='border-b border-zinc-800 p-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-sky-500/10 border border-sky-500/20'>
            <Clock className='text-sky-400' size={18} />
          </div>
          <h2 className='text-xl font-bold text-white'>PAST EXECUTIONS</h2>
        </div>
        <div className='text-xs px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400'>
          {executions.length} RESULTS
        </div>
      </div>

      <div className='divide-y divide-zinc-800'>
        {loading ? (
          <div className='p-10 text-center text-zinc-500'>
            <Loader2
              className='mx-auto mb-3 text-sky-400 animate-spin'
              size={32}
            />
            <p className='text-sm'>Loading past executions...</p>
          </div>
        ) : executions.length === 0 ? (
          <div className='p-10 text-center text-zinc-500'>
            <FileText className='mx-auto mb-3 text-zinc-700' size={32} />
            <p className='text-sm'>
              No resume executions yet. Run an analysis to see results here.
            </p>
          </div>
        ) : (
          executions.map(ex => (
            <ExecutionRow key={ex.id} execution={ex} onView={onView} />
          ))
        )}
      </div>
    </section>
  )
}

export default PastExecutions
