import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  Play,
  Settings,
  Trash2,
  Activity,
  ChevronRight,
  Command,
  Cpu,
  Zap
} from 'lucide-react'
import { fetchWorkflows } from '@/store/slices/workflowSlice'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'

export default function Workflows () {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(state => state.workflows)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    dispatch(fetchWorkflows())
  }, [dispatch])

  return (
    <div className='flex bg-[#0a0a0a] min-h-screen font-mono text-zinc-400'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='p-8 space-y-8 max-w-7xl mx-auto w-full'>
          {/* TERMINAL HEADER */}
          <header className='flex justify-between items-end border-b border-zinc-800 pb-6'>
            <div>
              <div className='flex items-center gap-2 text-emerald-500 mb-1'>
                <Terminal size={18} />
                <span className='text-xs font-bold tracking-widest uppercase'>
                  System Core
                </span>
              </div>
              <h1 className='text-3xl font-black text-white tracking-tighter'>
                WORKFLOW_ENGINES<span className='animate-pulse'>_</span>
              </h1>
            </div>

            <button className='group relative px-6 py-2 bg-zinc-100 text-black font-bold text-xs uppercase hover:bg-emerald-500 transition-colors'>
              <span className='relative z-10 flex items-center gap-2'>
                <Command size={14} /> Initialize_New_Sequence
              </span>
              <div className='absolute inset-0 bg-emerald-400 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform' />
            </button>
          </header>

          {/* SYSTEM STATUS BAR */}
          <section className='grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] uppercase tracking-widest border-b border-zinc-800 pb-8'>
            <div className='flex items-center gap-3 bg-zinc-900/50 p-3 border border-zinc-800'>
              <Cpu size={14} className='text-zinc-600' />
              <span>
                Nodes: <span className='text-white'>{items.length} Active</span>
              </span>
            </div>
            <div className='flex items-center gap-3 bg-zinc-900/50 p-3 border border-zinc-800'>
              <Activity size={14} className='text-zinc-600' />
              <span>
                Uptime: <span className='text-white'>99.98%</span>
              </span>
            </div>
            <div className='flex items-center gap-3 bg-zinc-900/50 p-3 border border-zinc-800'>
              <Zap size={14} className='text-zinc-600' />
              <span>
                Auto-Scale: <span className='text-emerald-500'>Enabled</span>
              </span>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <div className='space-y-3'>
            {loading ? (
              <div className='flex flex-col items-center justify-center h-64 space-y-4'>
                <div className='w-12 h-1 bg-zinc-800 overflow-hidden'>
                  <motion.div
                    className='h-full bg-emerald-500'
                    animate={{ x: [-48, 48] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: 'linear'
                    }}
                  />
                </div>
                <p className='text-[10px] uppercase tracking-[0.2em]'>
                  Synchronizing_Database...
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className='border-2 border-dashed border-zinc-800 rounded-lg p-12 text-center'>
                <p className='text-zinc-600 mb-4 tracking-widest'>
                  NO_EXECUTABLES_FOUND
                </p>
                <button className='text-emerald-500 hover:underline text-sm uppercase underline-offset-4'>
                  Run Setup Wizard?
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {items.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredId(workflow.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className='group relative flex items-center justify-between p-4 bg-zinc-900/20 border border-zinc-900 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all cursor-pointer'
                  >
                    {/* Active Indicator */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        workflow.is_active ? 'bg-emerald-500' : 'bg-zinc-800'
                      }`}
                    />

                    <div className='flex items-center gap-6'>
                      <div className='text-zinc-700 text-xs font-bold w-4'>
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div>
                        <div className='flex items-center gap-3'>
                          <h2 className='text-white font-bold tracking-tight text-lg group-hover:text-emerald-400 transition-colors'>
                            {workflow.name.toUpperCase()}
                          </h2>
                          <span className='text-[9px] px-2 py-0.5 border border-zinc-700 text-zinc-500 rounded'>
                            v1.0.4
                          </span>
                        </div>

                        <div className='flex items-center gap-4 mt-1 text-[11px] text-zinc-500 uppercase'>
                          <span className='flex items-center gap-1'>
                            <ChevronRight
                              size={12}
                              className='text-emerald-500'
                            />
                            Trigger: {workflow.trigger_type}
                          </span>
                          <span className='flex items-center gap-1'>
                            <Activity size={12} />
                            Agent: {workflow.agent_name || 'Generic_Runtime'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar (Only shows clearly on hover or terminal-style always) */}
                    <div className='flex items-center gap-6'>
                      <div className='hidden md:flex gap-8 mr-8 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <div className='flex flex-col items-end'>
                          <span className='text-[9px] text-zinc-600 uppercase'>
                            Status
                          </span>
                          <span className='text-[10px] text-emerald-500 leading-none'>
                            READY
                          </span>
                        </div>
                        <div className='flex flex-col items-end'>
                          <span className='text-[9px] text-zinc-600 uppercase'>
                            Last_Run
                          </span>
                          <span className='text-[10px] text-zinc-300 leading-none'>
                            2m ago
                          </span>
                        </div>
                      </div>

                      <div className='flex gap-2'>
                        <button
                          className='p-2 hover:bg-emerald-500 hover:text-black transition-colors rounded'
                          title='Execute'
                        >
                          <Play size={16} />
                        </button>
                        <button
                          className='p-2 hover:bg-zinc-100 hover:text-black transition-colors rounded'
                          title='Configure'
                        >
                          <Settings size={16} />
                        </button>
                        <button
                          className='p-2 hover:bg-red-600 hover:text-white transition-colors rounded'
                          title='Delete'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
