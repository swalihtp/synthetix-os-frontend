import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/60 border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg' />
          <span className='text-white font-bold text-lg'>Synthetix OS</span>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8 text-gray-300'>
          <a href='#features' className='hover:text-white transition'>
            Features
          </a>
          <a href='#tools' className='hover:text-white transition'>
            Integrations
          </a>
          <a href='#pricing' className='hover:text-white transition'>
            Pricing
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className='hidden md:flex items-center gap-4'>
          <Link
            to='/login'
            className='text-gray-300 hover:text-white transition'
          >
            Login
          </Link>

          <button className='bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2 rounded-xl text-white font-semibold hover:opacity-90 transition'>
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden px-6 pb-6 space-y-4 bg-black border-t border-gray-800'>
          <a href='#features' className='block text-gray-300 hover:text-white'>
            Features
          </a>
          <a href='#tools' className='block text-gray-300 hover:text-white'>
            Integrations
          </a>
          <a href='#pricing' className='block text-gray-300 hover:text-white'>
            Pricing
          </a>

          <div className='pt-4 border-t border-gray-800'>
            <Link
              to='/login'
              className='block w-full text-left text-gray-300 hover:text-white mb-3'
            >
              Login
            </Link>

            <button className='w-full bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl text-white font-semibold'>
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
