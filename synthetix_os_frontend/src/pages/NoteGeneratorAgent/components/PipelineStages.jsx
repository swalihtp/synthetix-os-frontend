import { Layers } from 'lucide-react'

function PipelineStages ({ activeStage }) {
  const stages = [
    { name: 'Ingestion', tasks: ['file.extract_text'] },
    {
      name: 'Analysis',
      tasks: [
        'ai.identify_topics',
        'ai.extract_decisions',
        'ai.extract_actions'
      ]
    },
    { name: 'Generation', tasks: ['ai.generate_summary'] }
  ]

  return (
    <div className='bg-zinc-900/40 border border-zinc-800 p-6'>
      <div className='flex items-center gap-3 mb-6'>
        <Layers className='text-violet-400' size={18} />
        <h2 className='text-lg font-bold text-white'>PIPELINE</h2>
      </div>
      <div className='space-y-4'>
        {stages.map((stage, i) => {
          const isDone = activeStage !== null && i < activeStage
          const isActive = activeStage === i
          return (
            <div key={stage.name}>
              <div className='flex items-center gap-3 mb-2'>
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isDone
                      ? 'bg-violet-500'
                      : isActive
                      ? 'bg-yellow-400 animate-pulse'
                      : 'bg-zinc-700'
                  }`}
                />
                <span
                  className={`text-sm font-semibold ${
                    isDone
                      ? 'text-violet-400'
                      : isActive
                      ? 'text-white'
                      : 'text-zinc-500'
                  }`}
                >
                  {stage.name.toUpperCase()}
                </span>
              </div>
              <div className='pl-6 space-y-1'>
                {stage.tasks.map(t => (
                  <div key={t} className='text-xs text-zinc-600 font-mono'>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PipelineStages
