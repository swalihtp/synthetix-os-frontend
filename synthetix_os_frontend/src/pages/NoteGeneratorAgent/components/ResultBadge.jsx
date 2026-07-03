

function ResultBadge ({ style }) {
  const map = {
    executive: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    detailed:
      'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    concise: 'border-orange-500/30 text-orange-400 bg-orange-500/10'
  }
  return (
    <span
      className={`text-[10px] px-2 py-1 border uppercase ${
        map[style] || 'border-zinc-700 text-zinc-400'
      }`}
    >
      {style || 'concise'}
    </span>
  )
}

export default ResultBadge
