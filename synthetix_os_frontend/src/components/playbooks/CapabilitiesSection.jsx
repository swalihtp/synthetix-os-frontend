import { ShieldCheck } from 'lucide-react'

export default function CapabilitiesSection ({ capabilities = [] }) {
  return (
    <section className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
      <h2 className='mb-5 text-lg font-semibold text-white'>Capabilities</h2>

      <div className='grid gap-3 md:grid-cols-2'>
        {capabilities.map(capability => (
          <div
            key={capability}
            className='flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4'
          >
            <ShieldCheck size={18} className='text-emerald-400' />

            <span className='text-sm text-zinc-300'>
              {capability.replaceAll('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
