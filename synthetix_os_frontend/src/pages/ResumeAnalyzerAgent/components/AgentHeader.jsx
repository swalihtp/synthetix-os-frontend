import { Briefcase } from 'lucide-react'
import AgentOptionsMenu from './AgentOptionsMenu'

function AgentHeader ({ onEdit, onDelete }) {
  return (
    <section className='border-b border-zinc-900 pb-6'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='p-3 bg-sky-500 text-black rounded-lg'>
          <Briefcase size={22} />
        </div>
        <div className='flex-1'>
          <h1 className='text-3xl font-black text-white'>Resume Analyzer</h1>
          <p className='text-zinc-500 text-sm mt-1'>
            Analyzes resumes, surfaces ATS risks, skill gaps, and improvement
            suggestions.
          </p>
        </div>
        <AgentOptionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className='flex items-center gap-3 text-xs mt-2'>
        <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-sky-400'>
          TYPE: career_agent
        </span>
        <span className='px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400'>
          ACTIVE
        </span>
      </div>
    </section>
  )
}

export default AgentHeader
