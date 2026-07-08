import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Menu,
  ChevronLeft,
  X,
  Brain,
  UserCog,
  UserCircleIcon
} from 'lucide-react'

import { useLocation, useNavigate } from 'react-router-dom'
import {
  closeMobileSidebar,
  selectMobileSidebarOpen
} from '@/store/slices/uiSlice'

export default function Sidebar ({ isMobileOpen, onMobileClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mobileSidebarOpen = useSelector(selectMobileSidebarOpen)

  // Persist sidebar state
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebar-expanded')
    return saved ? JSON.parse(saved) : false
  })

  // Save state whenever changed
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded))
  }, [isExpanded])

  const menu = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={18} />
    },
    {
      name: 'System Agents',
      path: '/system-agents',
      icon: <Bot size={18} />
    },
    {
      name: 'Persona',
      path: '/persona',
      icon: <Brain size={18} />
    },
    {
      name: 'My Agents',
      path: '/agents',
      icon: <UserCog size={18} />
    },
    {
      name: 'Workflows',
      path: '/workflows',
      icon: <Workflow size={18} />
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <UserCircleIcon size={18} />
    }
  ]

  const handleNavigate = path => {
    navigate(path)
    if (onMobileClose) onMobileClose()
    else dispatch(closeMobileSidebar())
  }

  const effectiveMobileOpen =
    typeof isMobileOpen === 'boolean' ? isMobileOpen : mobileSidebarOpen

  useEffect(() => {
    if (!effectiveMobileOpen) return

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [effectiveMobileOpen])

  const showLabels = isExpanded || effectiveMobileOpen
  const sidebarWidth = effectiveMobileOpen ? 'w-[82vw] max-w-[20rem]' : 'w-72'

  return (
    <>
      {effectiveMobileOpen && (
        <button
          type='button'
          className='fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden'
          aria-label='Close sidebar overlay'
          onClick={() => {
            if (onMobileClose) onMobileClose()
            else dispatch(closeMobileSidebar())
          }}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 flex min-h-screen flex-col border-r border-neutral-800 bg-black p-3 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:shadow-none
          ${effectiveMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarWidth} ${isExpanded ? 'lg:w-64' : 'lg:w-20'}
        `}
      >
      {/* Header */}
      <div className='mb-8 flex items-center justify-between'>
        {/* Logo */}
        <div
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-300
            ${showLabels ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
          `}
        >
          <h1 className='text-xl font-semibold'>Synthetix OS</h1>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => {
              if (onMobileClose) onMobileClose()
              else dispatch(closeMobileSidebar())
            }}
            className='rounded-lg p-2 text-zinc-400 transition-colors hover:bg-neutral-800 hover:text-white lg:hidden'
            aria-label='Close sidebar'
          >
            <X size={20} />
          </button>

          {/* Toggle */}
          <button
            type='button'
            onClick={() => setIsExpanded(prev => !prev)}
            className='shrink-0 rounded-lg p-2 transition-colors hover:bg-neutral-800'
          >
            {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu */}
      <ul className='space-y-2 overflow-y-auto pr-1'>
        {menu.map(item => {
          const isActive = location.pathname === item.path

          return (
            <li
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className={`
                flex h-11 cursor-pointer items-center overflow-hidden rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-neutral-800'
                }
                ${showLabels ? 'justify-start gap-3 px-3' : 'justify-center'}
              `}
            >
              <div className='shrink-0'>{item.icon}</div>

              <span
                className={`
                  overflow-hidden whitespace-nowrap text-sm transition-all duration-300
                  ${showLabels ? 'w-auto opacity-100' : 'w-0 opacity-0'}
                `}
              >
                {item.name}
              </span>
            </li>
          )
        })}
      </ul>
      </div>
    </>
  )
}
