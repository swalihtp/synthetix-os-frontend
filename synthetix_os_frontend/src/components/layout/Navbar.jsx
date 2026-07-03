import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 w-full z-100 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-zinc-900 border border-emerald-500/50 flex items-center justify-center'>
            <img src="gemini-svg.svg" alt="" />
          </div>
          <span className='text-white font-black text-sm uppercase tracking-[0.3em]'>Synthetix_OS</span>
        </div>

        <div className='hidden md:flex items-center gap-10 text-[10px] font-mono uppercase tracking-widest text-zinc-500'>
          <a href='#features' className='hover:text-emerald-500 transition-colors'>[ Features ]</a>
          <a href='#tools' className='hover:text-emerald-500 transition-colors'>[ Integrations ]</a>
          <a href='#pricing' className='hover:text-emerald-500 transition-colors'>[ Pricing ]</a>
        </div>

        <div className='hidden md:flex items-center gap-6'>
          <Link to='/login' className='text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition'>
            _Login
          </Link>
          <button className='bg-emerald-600/10 border border-emerald-500/50 px-5 py-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all'>
            Deploy_Now
          </button>
        </div>

        <button className='md:hidden text-zinc-500' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  )
}