import { FileText, Brain, Layers, ListChecks } from 'lucide-react'

function StatsBar ({ executions }) {
  const total = executions.length
  const concise = executions.filter(e => e.summaryStyle === 'concise').length
  const detailed = executions.filter(e => e.summaryStyle === 'detailed').length
  const executive = executions.filter(e => e.summaryStyle === 'executive').length
  const actionItems = executions.reduce((sum, e) => sum + (e.actionItemsCount || 0), 0)

  const stats = [
    { label: 'Total Processed', value: total, icon: Layers },
    { label: 'Concise Notes', value: concise, icon: Brain },
    { label: 'Detailed Notes', value: detailed, icon: FileText },
    { label: 'Action Items', value: actionItems || executive, icon: ListChecks }
  ]

  return (
    <section className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
      {stats.map(s => (
        <div
          key={s.label}
          className='bg-zinc-900/50 border border-zinc-800 p-5'
        >
          <div className='flex items-center justify-between mb-4'>
            <s.icon className='text-violet-400' size={16} />
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
