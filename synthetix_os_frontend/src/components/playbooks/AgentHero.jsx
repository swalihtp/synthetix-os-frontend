import { Sparkles } from 'lucide-react'

export default function AgentHero ({ agent }) {
  return (
    <section className='rounded-2xl border border-zinc-800 bg-zinc-950 p-8'>
      <div className='flex items-start justify-between gap-6'>
        <div className='space-y-4'>
          <div className='inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400'>
            <Sparkles size={12} />
            AI Automation
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-white'>
            {agent.name}
          </h1>

          <p className='max-w-3xl text-zinc-400 leading-relaxed'>
            {agent.description}
          </p>
        </div>
      </div>

      <div className='mt-6 flex flex-wrap gap-2'>
        {(agent.domain || []).map(domain => (
          <span
            key={domain}
            className='rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300'
          >
            {domain.replaceAll('_', ' ')}
          </span>
        ))}
      </div>
    </section>
  )
}
