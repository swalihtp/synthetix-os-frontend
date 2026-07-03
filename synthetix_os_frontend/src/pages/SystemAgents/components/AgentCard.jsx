import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, FileText, ClipboardList, TrendingUp, Bot } from 'lucide-react'

const iconMap = {
  'Smart Email Agent': Mail,
  'Resume Analyzer': FileText,
  'Meeting Notes Generator': ClipboardList,
  'Market Intelligence Agent': TrendingUp
}

import AgentBadge from './AgentBadge'

export default function AgentCard ({ agent, index }) {
  const navigate = useNavigate()

  const Icon = iconMap[agent.name] || Bot

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className='
        bg-zinc-900/40
        border
        border-zinc-800
        hover:border-emerald-500/40
        transition-all
        p-6
        flex
        flex-col
      '
    >
      <div className='flex items-center justify-between mb-5'>
        <div className='p-3 bg-emerald-500 text-black rounded-lg'>
          <Icon size={20} />
        </div>

      </div>

      <h2 className='text-xl font-bold text-white mb-2'>{agent.name}</h2>

      <p className='text-sm text-zinc-500 flex-1'>{agent.description}</p>


      <button
        onClick={() => navigate(`/system-agents/${agent.id}`)}
        className='
          mt-6
          flex
          items-center
          justify-center
          gap-2
          border
          border-zinc-700
          hover:border-emerald-500
          hover:text-emerald-400
          py-3
          transition-all
        '
      >
        View Details
        <ArrowRight size={16} />
      </button>
    </motion.div>
  )
}
