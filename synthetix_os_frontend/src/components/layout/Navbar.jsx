import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <nav className='fixed left-0 top-0 z-50 w-full border-b border-zinc-900 bg-[#050505]/80 backdrop-blur-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Link to='/' className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-zinc-900 border border-emerald-500/50 flex items-center justify-center'>
            <img src="gemini-svg.svg" alt="" />
          </div>
          <span className='text-sm font-black uppercase tracking-[0.3em] text-white'>Synthetix_OS</span>
        </Link>

        <div className='hidden items-center gap-10 text-[10px] font-mono uppercase tracking-widest text-zinc-500 md:flex'>
          <a href='#features' className='hover:text-emerald-500 transition-colors'>[ Features ]</a>
          <a href='#tools' className='hover:text-emerald-500 transition-colors'>[ Integrations ]</a>
          <a href='#pricing' className='hover:text-emerald-500 transition-colors'>[ Pricing ]</a>
        </div>

        <div className='hidden items-center gap-6 md:flex'>
          <Link
            to={isAuthenticated ? '/dashboard' : '/login'}
            className='text-[10px] font-mono uppercase tracking-widest text-zinc-500 transition hover:text-white'
          >
            {isAuthenticated ? 'Home' : '_Login'}
          </Link>
          <button className='bg-emerald-600/10 border border-emerald-500/50 px-5 py-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all'>
            Deploy_Now
          </button>
        </div>

        <button
          type='button'
          className='text-zinc-500 md:hidden'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle navigation menu'
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className='border-t border-zinc-900 bg-[#050505]/95 px-4 py-4 backdrop-blur-md md:hidden'>
          <div className='mx-auto flex max-w-7xl flex-col gap-4 text-sm font-mono uppercase tracking-widest text-zinc-500'>
            <a href='#features' className='py-2 transition-colors hover:text-emerald-500'>
              [ Features ]
            </a>
            <a href='#tools' className='py-2 transition-colors hover:text-emerald-500'>
              [ Integrations ]
            </a>
            <a href='#pricing' className='py-2 transition-colors hover:text-emerald-500'>
              [ Pricing ]
            </a>
            <Link
              to={isAuthenticated ? '/' : '/login'}
              className='py-2 transition-colors hover:text-white'
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? 'Home' : '_Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
