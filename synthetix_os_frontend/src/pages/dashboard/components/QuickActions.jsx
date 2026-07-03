import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import QuickActionCard from './QuickActionCard'
import { QUICK_ACTIONS } from '../data/quickActions'

export default function QuickActions () {
  return (
    <div className='space-y-6'>
      <section className='rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-sm'>
        <div className='mb-6'>
          <div className='flex items-center gap-2'>
            <Zap size={18} className='text-emerald-300' />
            <h2 className='text-lg font-semibold text-white'>Quick Actions</h2>
          </div>

          <p className='mt-2 text-sm leading-6 text-zinc-500'>
            Jump directly into your most common AI tasks.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {QUICK_ACTIONS.slice(0, 4).map(action => (
            <QuickActionCard key={action.title} action={action} />
          ))}
        </div>
      </section>

      <section className='relative overflow-hidden rounded-[1.5rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-zinc-950 p-6'>
        <div className='relative z-10'>
          <Sparkles className='mb-3 text-emerald-300' size={20} />
          <h3 className='text-lg font-semibold text-white'>
            Explore AI Applications
          </h3>
          <p className='mt-2 max-w-md text-sm leading-6 text-zinc-400'>
            Discover curated agents and workflows created by the community.
          </p>

          <Link
            to='/system-agents'
            className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200'
          >
            Open Marketplace
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className='pointer-events-none absolute right-0 bottom-0 opacity-10'>
          <Sparkles size={120} className='translate-x-4 translate-y-4' />
        </div>
      </section>
    </div>
  )
}
