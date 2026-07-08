import { useEffect, useRef, useState } from 'react'
import { Bell, Menu, Search, User, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  logout,
  fetchUserProfile,
  selectUser,
  selectIsAuthenticated
} from '../../store/slices/authSlice'
import { openMobileSidebar } from '@/store/slices/uiSlice'

export default function Topbar ({ onMenuClick }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Fetch profile on mount if authenticated but user data is missing
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile())
    }
  }, [isAuthenticated, user, dispatch])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside (e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const initials = name => {
    if (!name) return '--'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const shortId = uuid => {
    if (!uuid) return '0x???'
    const clean = uuid.replace(/-/g, '')
    return `0x${clean.slice(0, 3)}...${clean.slice(-2)}`
  }

  return (
    <div className='sticky top-0 z-[60] border-b border-zinc-900 bg-[#050505] px-4 py-3 sm:px-6 lg:px-8 lg:py-4'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          <button
            type='button'
            onClick={() => {
              if (onMenuClick) {
                onMenuClick()
                return
              }

              dispatch(openMobileSidebar())
            }}
            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-white md:hidden'
            aria-label='Open sidebar menu'
          >
            <Menu size={18} />
          </button>

          <button
            type='button'
            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white md:hidden'
            aria-label='Search'
          >
            <Search size={16} />
          </button>

          <div className='hidden min-w-0 items-center border border-zinc-800 bg-zinc-950 px-4 py-2 transition-colors focus-within:border-emerald-500 md:flex md:w-[340px] md:flex-none lg:w-[420px]'>
            <Search size={14} className='text-zinc-500' />
            <input
              className='ml-3 w-full bg-transparent text-xs font-mono uppercase tracking-widest text-zinc-300 outline-none placeholder:text-zinc-700'
              placeholder='SEARCH_SYSTEM...'
            />
          </div>
        </div>

        <div className='flex items-center gap-2 sm:gap-3 md:gap-6'>
          {/* Notifications */}
          <button className='relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white'>
            <Bell size={18} />
            <span className='absolute right-2 top-2 flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
            </span>
          </button>

          {/* Profile */}
          <div
            ref={dropdownRef}
            className='relative flex items-center gap-2 border-zinc-900 md:gap-3 md:border-l md:pl-6'
          >
            {/* Name + ID */}
            <div className='hidden text-right sm:block'>
              <p className='text-[10px] font-bold uppercase tracking-tighter text-white'>
                {user?.full_name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className='font-mono text-[9px] text-zinc-600'>
                ID: {user ? shortId(user.id) : '...'}
              </p>
            </div>

            {/* Icon button */}
            <div
              onClick={() => setOpen(prev => !prev)}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border bg-zinc-900 transition-all
                ${
                  open
                    ? 'border-emerald-500 text-emerald-500'
                    : 'border-zinc-800 text-zinc-500 hover:border-emerald-500 hover:text-emerald-500'
                }`}
            >
              <User size={16} />
            </div>

            {/* Dropdown */}
            {open && (
              <div className='absolute right-0 top-[calc(100%+10px)] z-50 w-56 overflow-hidden border border-zinc-800 bg-zinc-950'>
                {/* Header */}
                <div className='p-3 border-b border-zinc-900'>
                  {user ? (
                    <>
                      <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-sm bg-emerald-950 border border-emerald-900 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm flex-shrink-0'>
                          {initials(user.full_name)}
                        </div>
                        <div className='overflow-hidden'>
                          <p className='text-xs font-bold text-white truncate'>
                            {user.full_name}
                          </p>
                          <p className='text-[10px] font-mono text-zinc-500 truncate'>
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`mt-2 inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wide px-2 py-0.5 border
                        ${
                          user.is_verified
                            ? 'text-emerald-400 bg-emerald-950 border-emerald-900'
                            : 'text-red-400 bg-red-950 border-red-900'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.is_verified ? 'bg-emerald-400' : 'bg-red-400'
                          }`}
                        />
                        {user.is_verified ? 'Verified' : 'Unverified'}
                      </div>
                    </>
                  ) : (
                    <div className='flex items-center gap-3 animate-pulse'>
                      <div className='w-9 h-9 rounded-sm bg-zinc-800 flex-shrink-0' />
                      <div>
                        <div className='h-2.5 bg-zinc-800 rounded w-24 mb-2' />
                        <div className='h-2 bg-zinc-800 rounded w-32' />
                      </div>
                    </div>
                  )}
                </div>

                {/* Menu items */}
                <div className='py-1'>
                  <button
                    onClick={() => {
                      setOpen(false)
                      navigate('/profile')
                    }}
                    className='flex items-center gap-2.5 w-full px-3 py-2.5 text-[11px] font-mono text-zinc-400 uppercase tracking-wide hover:bg-zinc-900 hover:text-white transition-colors'
                  >
                    <User size={13} />
                    View_Profile
                  </button>
                  <div className='h-px bg-zinc-900 mx-0 my-1' />
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-2.5 w-full px-3 py-2.5 text-[11px] font-mono text-zinc-400 uppercase tracking-wide hover:bg-red-950 hover:text-red-400 transition-colors'
                  >
                    <LogOut size={13} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
