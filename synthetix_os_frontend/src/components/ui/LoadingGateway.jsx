import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SVGSyntheticLogo = ({ className }) => (
  <svg
    viewBox='0 0 100 100'
    className={className}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    {/* The 'O' Box */}
    <rect
      x='32.5' // Centered the logo elements
      y='10'
      width='35'
      height='35'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='square'
    />

    {/* The 'S' Shape */}
    <path
      d='M32.5 55 H 67.5 V 70 H 42.5 V 85 H 77.5 V 60 H 52.5'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinejoin='round'
      strokeLinecap='round'
    />
  </svg>
)

export default function LoadingGateway({ isLoading = true }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key='gateway_overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] font-mono p-10 select-none cursor-wait'
        >
          {/* Breathing Logo & Text Container */}
          <motion.div 
            className='flex flex-col items-center'
            animate={{ 
              opacity: [0.4, 1, 0.4], // Perpetual fade loop
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* The Icon */}
            <SVGSyntheticLogo className='w-32 h-32 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]' />
            
            {/* Brand Identity - Now Bottom Aligned */}
            <div className='mt-6 text-center space-y-1'>
              <h1 className='text-white text-xl font-black uppercase tracking-[0.3em]'>
                Synthetix
              </h1>
              <div className='flex items-center justify-center gap-2'>
                <div className='h-[1px] w-4 bg-emerald-900' />
                <span className='text-emerald-500 text-[10px] font-bold uppercase tracking-[0.5em]'>
                  OS
                </span>
                <div className='h-[1px] w-4 bg-emerald-900' />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}