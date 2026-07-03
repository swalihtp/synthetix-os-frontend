import AdminSidebar from './AdminSidebar'
import TopBar from './TopBar'
import StatusBar from './StatusBar'
import { useState } from 'react'

export default function AdminLayout ({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className='dark'>
      {/* CRT scanline overlay */}
      <div className='scanline-overlay' />

      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <TopBar collapsed={collapsed} />

      <main
        className={`min-h-screen bg-zinc-950 pt-16 transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        <div className='p-6'>{children}</div>

        <StatusBar />
      </main>
    </div>
  )
}
