import { Grid2x2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import ApplicationCard from './ApplicationCard'
import { APPLICATIONS } from '../data/application'

export default function ApplicationsGrid ({ data = [] }) {
  const applications = data.map(app => ({
    ...app,
    ...(APPLICATIONS[app.name] || {})
  }))

  return (
    <section className='rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-sm'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <Grid2x2 size={18} className='text-primary' />
            <h2 className='text-lg font-semibold text-white'>
              AI Applications
            </h2>
          </div>

          <p className='mt-2 max-w-xl text-sm leading-6 text-zinc-500'>
            Discover the applications available in your workspace and review
            how often each one is being used.
          </p>
        </div>

        <Link
          to='/system-agents'
          className='inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-emerald-300'
        >
          Explore Marketplace
          <span aria-hidden='true'>↗</span>
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className='rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/30 p-8 text-sm text-zinc-500'>
          No applications are configured yet.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {applications.map(application => (
            <ApplicationCard key={application.name} application={application} />
          ))}
        </div>
      )}
    </section>
  )
}
