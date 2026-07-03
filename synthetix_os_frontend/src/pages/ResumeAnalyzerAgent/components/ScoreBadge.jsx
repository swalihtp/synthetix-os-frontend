function ScoreBadge ({ score }) {
  const color =
    score >= 75
      ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
      : score >= 50
      ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
      : 'border-red-500/30 text-red-400 bg-red-500/10'

  return (
    <span
      className={`text-[10px] px-2 py-1 border uppercase font-bold ${color}`}
    >
      Score: {score}
    </span>
  )
}

export default ScoreBadge