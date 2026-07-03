import { useState, useRef } from 'react'
import { Brain, Upload, ChevronDown, Loader2, Lightbulb } from 'lucide-react'
import PipelineStages from './PipelineStages'

function NewTaskForm ({ onSubmit, loading, activeStage }) {
  const [file, setFile] = useState(null)
  const [summaryStyle, setSummaryStyle] = useState('concise')
  const fileRef = useRef()
  const styles = [
    { value: 'concise', label: 'Concise' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'executive', label: 'Executive' }
  ]

  const handleFile = e => setFile(e.target.files[0] || null)

  const handleSubmit = () => {
    if (!file || !summaryStyle) return
    onSubmit({ file, summary_style: summaryStyle })
  }

  return (
    <div className='bg-zinc-900/40 border border-zinc-800 p-6 xl:col-span-2'>
      <div className='flex items-center gap-3 mb-6'>
        <Lightbulb className='text-violet-400' size={18} />
        <h2 className='text-lg font-bold text-white'>NEW TASK</h2>
      </div>

      <div className='space-y-5'>
        {/* File Upload */}
        <div>
          <label className='text-xs uppercase text-zinc-500 mb-2 block'>
            Upload Transcript
          </label>
          <div
            onClick={() => fileRef.current.click()}
            className='border border-dashed border-zinc-700 hover:border-violet-500/50 transition-colors p-6 cursor-pointer flex flex-col items-center gap-2'
          >
            <Upload className='text-zinc-500' size={20} />
            {file ? (
              <span className='text-sm text-violet-300'>{file.name}</span>
            ) : (
              <span className='text-sm text-zinc-500'>
                Click to upload .txt, .pdf, .docx, .md
              </span>
            )}
            <input
              ref={fileRef}
              type='file'
              accept='.txt,.pdf,.docx,.md'
              className='hidden'
              onChange={handleFile}
            />
          </div>
        </div>

        {/* Style Select */}
        <div>
          <label className='text-xs uppercase text-zinc-500 mb-2 block'>
            Summary Style
          </label>
          <div className='relative'>
            <select
              value={summaryStyle}
              onChange={e => setSummaryStyle(e.target.value)}
              className='w-full bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-violet-500 transition-colors'
            >
              {styles.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none'
              size={14}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!file || !summaryStyle || loading}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors'
        >
          {loading ? (
            <>
              <Loader2 size={16} className='animate-spin' /> Processing...
            </>
          ) : (
            <>
              <Brain size={16} /> Generate Notes
            </>
          )}
        </button>
      </div>

      {/* Pipeline progress shown inline when active */}
      {loading && (
        <div className='mt-6 pt-6 border-t border-zinc-800'>
          <PipelineStages activeStage={activeStage} />
        </div>
      )}
    </div>
  )
}

export default NewTaskForm
