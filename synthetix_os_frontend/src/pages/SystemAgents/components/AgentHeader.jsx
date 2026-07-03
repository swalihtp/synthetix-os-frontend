import { Bot } from 'lucide-react'

export default function AgentHeader () {
  return (
    <section className='border-b border-zinc-900 pb-6'>
      <div className='flex items-center gap-4'>
        <div className='p-3 rounded-lg bg-emerald-500 text-black'>
          <Bot size={24} />
        </div>

        <div>
          <h1 className='text-3xl font-black text-white'>System Agents</h1>

          <p className='text-zinc-500 mt-1'>
            Built-in AI agents available inside Synthetix OS.
          </p>
        </div>
      </div>
    </section>
  )
}
