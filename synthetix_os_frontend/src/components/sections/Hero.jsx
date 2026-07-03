import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Shield } from 'lucide-react'

const Hero = () => {
  const [step, setStep] = useState(0)
  const thinkingSteps = [
    'INITIALIZING_KERNEL...',
    'SCANNING_INBOX_VECTORS...',
    'CONTEXT_RETRIEVAL_ACTIVE',
    'DECISION: WORKFLOW_TRIGGERED',
    'STATUS: 200_OK'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % thinkingSteps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-screen bg-[#050505] text-zinc-400 font-mono selection:bg-emerald-500/30 overflow-hidden relative pt-20'>
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(24,24,27,1)_1px,_transparent_0)] bg-[size:40px_40px] opacity-30" />

      <main className='max-w-7xl mx-auto px-10 pt-24 grid lg:grid-cols-2 gap-16 items-center relative z-10'>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className='flex items-center gap-2 text-emerald-500 mb-6'>
            <Activity size={14} className="animate-pulse" />
            <span className='font-bold tracking-[0.4em] text-[10px] uppercase'>Uplink_Established</span>
          </div>
          
          <h1 className='text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase'>
            Hire Digital <br />
            <span className='text-zinc-800 outline-text'>Employees.</span>
          </h1>

          <p className='mt-8 text-sm text-zinc-500 max-w-md leading-relaxed border-l border-zinc-800 pl-6'>
            Deploy autonomous agents that interface with your kernel, process natural language, 
            and execute cross-platform protocols.
          </p>

          <div className='mt-10 flex flex-wrap items-center gap-4'>
            <button className='bg-white text-black px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all'>
              Initialize_System
            </button>
            <button className='border border-zinc-800 px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:border-zinc-500 transition-all'>
              View_Documentation
            </button>
          </div>
        </motion.div>

        {/* The Visualizer Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className='relative'>
          <div className='bg-zinc-900/40 border border-zinc-800 p-8 shadow-2xl relative'>
            <div className='absolute top-0 right-0 p-4 opacity-10 text-emerald-500'><Shield size={100} /></div>
            
            <div className='flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/50'>
               <div className='flex gap-2'>
                 <div className='w-2 h-2 bg-zinc-800' /><div className='w-2 h-2 bg-zinc-800' /><div className='w-2 h-2 bg-zinc-800' />
               </div>
               <span className='text-[10px] text-zinc-600'>AGENT_ID: SYNTH_01</span>
            </div>

            <div className='bg-black border border-zinc-800 p-6 min-h-[160px] flex flex-col justify-center relative'>
              <div className="absolute top-2 left-2 w-1 h-1 bg-emerald-500 animate-ping" />
              <AnimatePresence mode='wait'>
                <motion.p key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='text-emerald-500 text-xs'>
                  <span className='text-zinc-700 mr-3'>[$]</span> {thinkingSteps[step]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-4'>
              <div className='p-4 bg-zinc-950 border border-zinc-800 text-[10px] uppercase tracking-widest'>
                <p className='text-zinc-600 mb-1'>Handshake</p>
                <span className='text-emerald-500'>SECURE</span>
              </div>
              <div className='p-4 bg-zinc-950 border border-zinc-800 text-[10px] uppercase tracking-widest'>
                <p className='text-zinc-600 mb-1'>Load</p>
                <span className='text-white'>14.2%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Hero