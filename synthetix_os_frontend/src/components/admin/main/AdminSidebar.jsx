import {
  Terminal,
  Workflow,
  Users,
  Bot,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'

import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '@/store/slices/authSlice'
import { useDispatch } from 'react-redux'

const navLinks = [
  {
    icon: Terminal,
    label: 'CORE_ENGINE',
    path: '/admin'
  },
  {
    icon: Users,
    label: 'USER_REGISTRY',
    path: '/admin/user-registry'
  },
  {
    icon: Bot,
    label: 'BUILT_IN_AGENTS',
    path: '/admin/built-in-agents'
  },
]

export default function AdminSidebar ({ collapsed, setCollapsed }) {
  const linkBaseClass =
    'flex w-full items-center rounded-xl px-3 py-3 transition-all duration-200'

  const activeClass = 'bg-emerald-500/10 text-emerald-400'

  const inactiveClass = 'text-zinc-400 hover:bg-zinc-900 hover:text-white'

  const dispatch = useDispatch()

  const navigate = useNavigate()

  return (
    <aside
      className={`fixed left-0 top-0 flex h-screen flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Header */}
      <div className='border-b border-zinc-800 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 overflow-hidden'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10'>
              <Terminal className='h-5 w-5 text-emerald-400' />
            </div>

            {!collapsed && (
              <div>
                <h1 className='whitespace-nowrap font-bold text-white'>
                  Synthetix OS
                </h1>

                <p className='text-xs text-zinc-500'>Mission Control</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(prev => !prev)}
            className='text-zinc-400 transition-colors hover:text-white'
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-3'>
        {!collapsed && (
          <p className='mb-3 px-3 text-xs uppercase tracking-wider text-zinc-500'>
            Core Operations
          </p>
        )}

        <div className='space-y-1'>
          {navLinks.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === '/admin'}
              title={collapsed ? label : ''}
              className={({ isActive }) =>
                `${linkBaseClass}
      ${collapsed ? 'justify-center' : 'gap-3'}
      ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Icon size={20} />

              {!collapsed && (
                <span className='whitespace-nowrap text-sm font-medium'>
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className='border-t border-zinc-800 p-3'>
        <div
          className={`mb-4 flex items-center rounded-xl bg-zinc-900 p-3 cursor-pointer ${
            collapsed ? 'justify-center' : 'gap-3'
          }`}
          onClick={()=>navigate('/admin/profile')}
        >
          <img
            src='https://i.pravatar.cc/100'
            alt='Admin'
            className='h-10 w-10 rounded-full'
          />

          {!collapsed && (
            <div className='overflow-hidden'
            
            
            >
              <p className='truncate text-sm text-white'>SYS_ADMIN_01</p>

              <p className='text-xs text-emerald-400'>Active Session</p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            dispatch(logout())
          }}
          className={`flex w-full items-center rounded-xl px-3 py-3 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400 ${
            collapsed ? 'justify-center' : 'gap-3'
          }`}
        >
          <LogOut size={18} />

          {!collapsed && <span className='text-sm font-medium'>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
