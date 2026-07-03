import { Target, Upload, Zap, Loader2 } from 'lucide-react'
import PipelineStages from './PipelineStages'

function NewTaskForm ({
  file,
  targetRole,
  jobDescription,
  onFileChange,
  onTargetRoleChange,
  onJobDescriptionChange,
  onSubmit,
  loading,
  activeStage,
  error,
  fileInputRef
}) {
  return (
    <div className='bg-zinc-900/40 border border-zinc-800 p-6 xl:col-span-2'>
      <div className='flex items-center gap-3 mb-6'>
        <Target className='text-sky-400' size={18} />
        <h2 className='text-lg font-bold text-white'>NEW ANALYSIS</h2>
      </div>

      <div className='space-y-5'>
        {error && (
          <div className='border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm'>
            {error}
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className='text-xs uppercase text-zinc-500 mb-2 block'>
            Upload Resume <span className='text-red-400'>*</span>
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className='border border-dashed border-zinc-700 hover:border-sky-500/50 transition-colors p-6 cursor-pointer flex flex-col items-center gap-2'
          >
            <Upload className='text-zinc-500' size={20} />
            {file ? (
              <span className='text-sm text-sky-300'>{file.name}</span>
            ) : (
              <span className='text-sm text-zinc-500'>
                Click to upload .pdf or .docx
              </span>
            )}
            <input
              ref={fileInputRef}
              type='file'
              accept='.pdf,.docx'
              className='hidden'
              onChange={onFileChange}
            />
          </div>
        </div>

        {/* Target Role */}
        <div>
          <label className='text-xs uppercase text-zinc-500 mb-2 block'>
            Target Role <span className='text-zinc-600'>(optional)</span>
          </label>
          <input
            type='text'
            value={targetRole}
            onChange={e => onTargetRoleChange(e.target.value)}
            placeholder='e.g. Senior Frontend Engineer'
            className='w-full bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-sky-500 transition-colors'
          />
        </div>

        {/* Job Description */}
        <div>
          <label className='text-xs uppercase text-zinc-500 mb-2 block'>
            Job Description <span className='text-zinc-600'>(optional)</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={e => onJobDescriptionChange(e.target.value)}
            rows={4}
            placeholder='Paste the job description here to get targeted gap analysis...'
            className='w-full bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-sky-500 transition-colors resize-none'
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={!file || loading}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors'
        >
          {loading ? (
            <>
              <Loader2 size={16} className='animate-spin' /> Analyzing...
            </>
          ) : (
            <>
              <Zap size={16} /> Analyze Resume
            </>
          )}
        </button>
      </div>

      {loading && <PipelineStages activeStage={activeStage} />}
    </div>
  )
}

export default NewTaskForm
