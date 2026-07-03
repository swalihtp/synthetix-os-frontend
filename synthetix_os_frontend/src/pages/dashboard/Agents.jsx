import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Fingerprint,
  Plus,
  Terminal as TerminalIcon,
  ArrowRight
} from 'lucide-react'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import { useNavigate } from 'react-router-dom'
import LoadingGateway from '@/components/ui/LoadingGateway'
import { fetchAgents } from '@/store/slices/agentsSlice'

export default function Agents () {
  const dispatch = useDispatch()
  const [prompt, setPrompt] = useState('')

  const agents = useSelector(state => state.agents.items) || []
  const loading = useSelector(state => state.agents.loading)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAgents())
  }, [dispatch])

  const handleAgentNavigation = agent => {
    console.log(agent)

    switch (agent.name.toLowerCase()) {
      case 'smart email agent':
        navigate(`/email-agents/${agent.id}`)
        break

      case 'market_intelligence':
        navigate(`/market-agents/${agent.id}`)
        break

      case 'social':
        navigate(`/social-agents/${agent.id}`)
        break
      case 'meeting notes generator':
        navigate(`/meeting-notes-generator/${agent.id}`)
        break
      case 'resume analyzer':
        navigate(`/resume-analyzer/${agent.id}`)
        break

      default:
        navigate(`/agents/${agent.id}`)
    }
  }

  if (loading) {
    return (
      <>
        <LoadingGateway />
      </>
    )
  }

  return (
    <div className='flex bg-[#050505] min-h-screen font-mono text-zinc-400'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='p-6 lg:p-10 space-y-10 max-w-7xl mx-auto w-full'>
          {/* 2. REGISTRY HEADER */}
          <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-6'>
            <div>
              <h2 className='text-white text-2xl font-bold flex items-center gap-3'>
                <Fingerprint className='text-emerald-500' />
                NEURAL_REGISTRY
              </h2>
              <p className='text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-1'>
                Active instances currently deployed in kernel
              </p>
            </div>
          </div>

          {/* 3. AGENTS GRID */}
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            <AnimatePresence>
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className='group relative bg-zinc-900/40 border border-zinc-800 p-6 hover:border-emerald-500/50 transition-all overflow-hidden'
                  onClick={() => handleAgentNavigation(agent)}
                >
                  {/* Background Scanner Effect */}
                  <div className='absolute top-0 left-0 w-full h-px bg-emerald-500/10 group-hover:h-0.5 group-hover:bg-emerald-500/30 transition-all'></div>

                  <div className='flex justify-between items-start mb-6'>
                    <div className='p-3 bg-zinc-800 rounded-lg group-hover:bg-emerald-500 transition-colors'>
                      <Bot
                        size={24}
                        className='text-white group-hover:text-black'
                      />
                    </div>
                    <div className='text-right'>
                      <span className='text-[9px] text-zinc-600 block uppercase'>
                        Identity_Scan
                      </span>
                      <span className='text-[10px] text-emerald-500 font-bold'>
                        {agent.id.slice(0, 8)}
                      </span>
                    </div>
                  </div>

                  <h3 className='text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors'>
                    {agent.name.toUpperCase()}
                  </h3>

                  <p className='text-xs text-zinc-500 leading-relaxed mb-6 line-clamp-2 italic'>
                    "
                    {agent.description ||
                      'No neural profile description provided.'}
                    "
                  </p>

                  {/* DATA POINTS */}
                  <div className='space-y-2 mb-8'>
                    <div className='flex justify-between text-[10px] uppercase'>
                      <span className='text-zinc-600'>Cognitive_Type</span>
                      <span className='text-zinc-300'>LLM_CORE_V3</span>
                    </div>
                    <div className='w-full h-1 bg-zinc-800 overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        className='h-full bg-emerald-500'
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className='flex items-center gap-3'>
                    <button className='flex-1 py-2 bg-zinc-800 hover:bg-zinc-100 hover:text-black text-white text-[10px] font-bold uppercase transition-all'>
                      Configure
                    </button>
                    <button className='p-2 border border-zinc-800 hover:border-emerald-500 transition-colors'>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* CREATE NEW CARD (PLACEHOLDER) */}
            <motion.div
              className='border-2 border-dashed border-zinc-900 rounded-lg flex flex-col items-center justify-center p-8 hover:bg-zinc-900/20 transition-all cursor-pointer group'
              whileHover={{ scale: 0.98 }}
            >
              <div className='p-4 rounded-full bg-zinc-900 text-zinc-700 group-hover:text-emerald-500 transition-colors'>
                <Plus size={32} />
              </div>
              <p className='text-[10px] uppercase tracking-widest mt-4 text-zinc-700 group-hover:text-zinc-400'>
                Add_Custom_Module
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
