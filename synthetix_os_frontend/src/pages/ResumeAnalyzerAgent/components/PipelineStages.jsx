function PipelineStages ({ activeStage }) {
  const stages = [
    { name: 'Ingestion', tasks: ['file.extract_text', 'resume.parse'] },
    {
      name: 'Analysis',
      tasks: ['ai.extract_skills', 'ai.detect_gaps', 'ai.score_resume']
    },
    { name: 'Recommendation', tasks: ['ai.generate_feedback'] }
  ]

  return (
    <div className='mt-6 pt-6 border-t border-zinc-800 space-y-4'>
      {stages.map((stage, i) => {
        const isDone = activeStage !== null && i < activeStage
        const isActive = activeStage === i
        return (
          <div key={stage.name}>
            <div className='flex items-center gap-3 mb-1'>
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isDone
                    ? 'bg-sky-500'
                    : isActive
                    ? 'bg-yellow-400 animate-pulse'
                    : 'bg-zinc-700'
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  isDone
                    ? 'text-sky-400'
                    : isActive
                    ? 'text-white'
                    : 'text-zinc-500'
                }`}
              >
                {stage.name.toUpperCase()}
              </span>
            </div>
            <div className='pl-6 space-y-0.5'>
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
  )
}

export default PipelineStages