import { FileText } from 'lucide-react'
import AgentOptionsMenu from './Agentoptionsmenu '
function AgentHeader({ onEdit, onDelete }) {
  return (
    <section className='border-b border-zinc-900 pb-6'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='p-3 bg-violet-500 text-black rounded-lg'>
          <FileText size={22} />
        </div>
        <div className='flex-1'>
          <h1 className='text-3xl font-black text-white'>
            Meeting Notes Generator
          </h1>
          <p className='text-zinc-500 text-sm mt-1'>
            Converts meeting transcripts into concise summaries, decisions, and
            action items.
          </p>
        </div>
        <AgentOptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className='flex items-center gap-3 text-xs mt-2'>
        <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-violet-400'>
          TYPE: productivity_agent
        </span>
        <span className='px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400'>
          ACTIVE
        </span>
      </div>
    </section>
  )
}

export default AgentHeader