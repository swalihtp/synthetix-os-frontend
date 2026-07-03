import { useState, useEffect } from 'react'
import { ShieldCheck, Search, Bell, Power, Cpu } from 'lucide-react'

export default function TopBar ({ collapsed }) {
  const [utcTime, setUtcTime] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-IN', {
          hour12: true
        })
      )
    }

    tick()
    const id = setInterval(tick, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 z-40 h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? 'left-20' : 'left-72'
      }`}
    >
      {' '}
      <div className='flex h-full items-center justify-between px-6'>
        {/* Left */}
        <div className='flex items-center gap-6'>
          <div>
            <h1 className='text-sm font-semibold tracking-wide text-white'>
              Synthetix Mission Control
            </h1>
          </div>

          <div className='hidden lg:flex items-center gap-3'>
            <div className='flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1'>
              <ShieldCheck className='h-4 w-4 text-emerald-400' />
              <span className='text-xs font-medium text-emerald-400'>
                System Stable
              </span>
            </div>

            <div className='flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1'>
              <Cpu className='h-4 w-4 text-zinc-400' />
              <span className='text-xs text-zinc-400'>Neural Link 01</span>
            </div>

            <div className='rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1'>
              <span className='font-mono text-xs text-zinc-400'>
                {currentTime}
              </span>{' '}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center gap-3'>
          {/* Search */}
          <div className='relative hidden md:block'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500' />

            <input
              type='text'
              placeholder='Search systems...'
              className='
                w-72 rounded-xl
                border border-zinc-800
                bg-zinc-900
                py-2 pl-10 pr-4
                text-sm text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                focus:border-emerald-500/50
                focus:ring-2
                focus:ring-emerald-500/10
              '
            />
          </div>
          {/* Actions */}
          <button className='rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white'>
            <Bell size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
