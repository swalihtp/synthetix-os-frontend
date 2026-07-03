function ScoreMeter ({ score }) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#eab308' : '#ef4444'
  const radius = 36
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ

  return (
    <div className='flex flex-col items-center gap-1'>
      <svg width='96' height='96' viewBox='0 0 96 96'>
        <circle
          cx='48'
          cy='48'
          r={radius}
          fill='none'
          stroke='#27272a'
          strokeWidth='8'
        />
        <circle
          cx='48'
          cy='48'
          r={radius}
          fill='none'
          stroke={color}
          strokeWidth='8'
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap='round'
          transform='rotate(-90 48 48)'
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text
          x='48'
          y='53'
          textAnchor='middle'
          fill='white'
          fontSize='16'
          fontWeight='bold'
          fontFamily='monospace'
        >
          {score}
        </text>
      </svg>
      <span className='text-xs text-zinc-500'>Resume Score</span>
    </div>
  )
}

export default ScoreMeter
