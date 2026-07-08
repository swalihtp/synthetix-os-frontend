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
    <div className='relative min-h-screen overflow-hidden bg-[#050505] pt-20 font-mono text-zinc-400 selection:bg-emerald-500/30'>
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(24,24,27,1)_1px,_transparent_0)] bg-[size:40px_40px] opacity-30" />

      <main className='relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-24'>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className='flex items-center gap-2 text-emerald-500 mb-6'>
            <Activity size={14} className="animate-pulse" />
            <span className='font-bold tracking-[0.4em] text-[10px] uppercase'>Uplink_Established</span>
          </div>
          
          <h1 className='text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-8xl'>
            Hire Digital <br />
            <span className='text-zinc-800 outline-text'>Employees.</span>
          </h1>

          <p className='mt-6 max-w-md border-l border-zinc-800 pl-4 text-sm leading-relaxed text-zinc-500 sm:mt-8 sm:pl-6'>
            Deploy autonomous agents that interface with your kernel, process natural language, 
            and execute cross-platform protocols.
          </p>

          <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-10'>
            <button className='bg-white px-8 py-4 text-[11px] font-black uppercase tracking-widest text-black transition-all hover:bg-emerald-500 sm:w-auto'>
              Initialize_System
            </button>
            <button className='border border-zinc-800 px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all hover:border-zinc-500 sm:w-auto'>
              View_Documentation
            </button>
          </div>
        </motion.div>

        {/* The Visualizer Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className='relative'>
          <div className='relative border border-zinc-800 bg-zinc-900/40 p-5 shadow-2xl sm:p-8'>
            <div className='absolute right-0 top-0 p-4 text-emerald-500 opacity-10'>
              <Shield size={100} />
            </div>
            
            <div className='mb-6 flex items-center justify-between border-b border-zinc-800/50 pb-4 sm:mb-8'>
               <div className='flex gap-2'>
                 <div className='w-2 h-2 bg-zinc-800' /><div className='w-2 h-2 bg-zinc-800' /><div className='w-2 h-2 bg-zinc-800' />
               </div>
               <span className='text-[10px] text-zinc-600'>AGENT_ID: SYNTH_01</span>
            </div>

            <div className='relative flex min-h-[160px] flex-col justify-center border border-zinc-800 bg-black p-5 sm:p-6'>
              <div className="absolute top-2 left-2 w-1 h-1 bg-emerald-500 animate-ping" />
              <AnimatePresence mode='wait'>
                <motion.p key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='text-emerald-500 text-xs'>
                  <span className='text-zinc-700 mr-3'>[$]</span> {thinkingSteps[step]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='border border-zinc-800 bg-zinc-950 p-4 text-[10px] uppercase tracking-widest'>
                <p className='text-zinc-600 mb-1'>Handshake</p>
                <span className='text-emerald-500'>SECURE</span>
              </div>
              <div className='border border-zinc-800 bg-zinc-950 p-4 text-[10px] uppercase tracking-widest'>
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
