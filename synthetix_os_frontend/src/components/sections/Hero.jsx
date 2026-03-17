import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [step, setStep] = useState(0)
  const thinkingSteps = [
    'Checking inbox...',
    'Understanding context...',
    'Accessing Knowledge System...',
    'Decision: Reply generated.',
    'Task completed'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % thinkingSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 overflow-hidden relative'>
      {/* Background Visuals */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
        <div className='absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-600/20 rounded-full blur-[120px] animate-pulse' />
        <div className='absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-600/10 rounded-full blur-[120px]' />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-10 pt-20 grid lg:grid-cols-2 gap-16 items-center'>
        {/* Left Side: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className='text-purple-400 font-medium tracking-widest text-xs uppercase'>
            Your AI Workforce, On Demand
          </span>
          <h1 className='text-7xl font-semibold tracking-tight leading-[1.1] mt-4'>
            Hire Digital <br />
            <span className='bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-500'>
              Employees.
            </span>
          </h1>
          <p className='mt-8 text-lg text-gray-400 max-w-md leading-relaxed'>
            Build AI agents that understand context, make decisions, and execute
            workflows—so you can focus on what matters.
          </p>

          <div className='mt-10 flex items-center gap-4'>
            <button className='bg-white text-black px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-200 transition-all'>
              Watch Demo
            </button>
            <button className='bg-white/5 border border-white/10 backdrop-blur-md px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all'>
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Right Side: Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className='relative'
        >
          {/* Glassmorphism Card */}
          <div className='relative z-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-3 h-3 rounded-full bg-red-500/50' />
              <div className='w-3 h-3 rounded-full bg-yellow-500/50' />
              <div className='w-3 h-3 rounded-full bg-green-500/50' />
              <span className='ml-4 text-xs text-gray-500 font-mono italic'>
                Synthetix Agent v1.0.4
              </span>
            </div>

            {/* AI Thinking Terminal */}
            <div className='bg-black/40 rounded-lg p-6 font-mono text-sm border border-white/5 min-h-50 flex flex-col justify-center'>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className='text-purple-300'
                >
                  <span className='text-gray-600 mr-2'>{'>'}</span>
                  {thinkingSteps[step]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Mock Workflow UI Elements */}
            <div className='mt-6 grid grid-cols-2 gap-4'>
              <div className='p-3 bg-white/5 rounded-lg border border-white/5 text-[10px] text-gray-400'>
                <p className='text-blue-400 mb-1'>Celery Worker</p>
                Status: <span className='text-green-500'>Active</span>
              </div>
              <div className='p-3 bg-white/5 rounded-lg border border-white/5 text-[10px] text-gray-400'>
                <p className='text-purple-400 mb-1'>RAG Context</p>
                Memory: <span className='text-white'>84% Synced</span>
              </div>
            </div>
          </div>

          {/* Decorative Floating Orb */}
          <div className='absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl' />
        </motion.div>
      </main>
    </div>
  )
}

export default Hero
