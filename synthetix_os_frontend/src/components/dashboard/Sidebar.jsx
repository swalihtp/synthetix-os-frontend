import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Menu,
  ChevronLeft,
  Brain,
  UserCog,
  UserCircle,
  UserCircleIcon
} from 'lucide-react'

import { useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar () {
  const location = useLocation()
  const navigate = useNavigate()

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

  return (
    <div
      className={`
        min-h-screen
        bg-black
        text-white
        border-r
        border-neutral-800
        p-3
        flex
        flex-col
        transition-[width]
        duration-300
        ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        {/* Logo */}
        <div
          className={`
            overflow-hidden
            whitespace-nowrap
            transition-all
            duration-300
            ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
          `}
        >
          <h1 className='text-xl font-semibold'>Synthetix OS</h1>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className='p-2 hover:bg-neutral-800 rounded-lg transition-colors shrink-0'
        >
          {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu */}
      <ul className='space-y-2'>
        {menu.map(item => {
          const isActive = location.pathname === item.path

          return (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`
                h-11
                rounded-xl
                cursor-pointer
                flex
                items-center
                overflow-hidden
                transition-all
                duration-200
                ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-neutral-800'
                }
                ${isExpanded ? 'px-3 gap-3 justify-start' : 'justify-center'}
              `}
            >
              <div className='shrink-0'>{item.icon}</div>

              <span
                className={`
                  whitespace-nowrap
                  overflow-hidden
                  transition-all
                  duration-300
                  text-sm
                  ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                `}
              >
                {item.name}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
