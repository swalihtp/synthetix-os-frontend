import { TrendingUp, ShieldCheck, FileText, Star } from 'lucide-react'

function StatsBar ({ executions }) {
  const total = executions.length
  const avgScore = total
    ? Math.round(executions.reduce((a, e) => a + (e.score || 0), 0) / total)
    : 0
  const highScores = executions.filter(e => (e.score || 0) >= 75).length
  const atsFlags = executions.reduce((a, e) => a + (e.atsIssuesCount || 0), 0)
  const missingSections = executions.reduce(
    (a, e) => a + (e.missingSectionsCount || 0),
    0
  )

  const stats = [
    { label: 'Resumes Analyzed', value: total, icon: FileText },
    {
      label: 'Avg. ATS Score',
      value: total ? `${avgScore}/100` : '—',
      icon: Star
    },
    { label: 'High Scorers (75+)', value: highScores, icon: TrendingUp },
    {
      label: 'Missing Sections',
      value: missingSections || atsFlags,
      icon: ShieldCheck
    }
  ]

  return (
    <section className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
      {stats.map(s => (
        <div
          key={s.label}
          className='bg-zinc-900/50 border border-zinc-800 p-5'
        >
          <div className='flex items-center justify-between mb-4'>
            <s.icon className='text-sky-400' size={16} />
            <span className='text-[10px] uppercase text-zinc-600'>
              all time
            </span>
          </div>
          <h3 className='text-3xl font-black text-white'>{s.value}</h3>
          <p className='text-zinc-500 text-sm mt-2'>{s.label}</p>
        </div>
      ))}
    </section>
  )
}

export default StatsBar
