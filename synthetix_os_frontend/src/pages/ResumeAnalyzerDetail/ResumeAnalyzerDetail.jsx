import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Loader2,
  FileText,
  FolderSearch,
  Layers3,
  ListChecks,
  ShieldAlert,
  Sparkles,
  Target,
  WandSparkles,
  Gauge,
  CircleAlert,
  Brain,
  Database,
  FileCode2,
  RotateCcw,
  Trash2
} from 'lucide-react'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import LoadingGateway from '@/components/ui/LoadingGateway'
import ScoreMeter from '@/pages/ResumeAnalyzerAgent/components/ScoreMeter'
import ScoreBadge from '@/pages/ResumeAnalyzerAgent/components/ScoreBadge'
import {
  getResumeExecutionDetail,
  deleteResumeExecution,
  retryResumeExecution
} from '@/api/resumeExecutions'
import { normalizeResumeExecution } from '@/pages/ResumeAnalyzerAgent/components/analysisUtils'

function formatDate (value) {
  if (!value) return 'N/A'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleString()
}

function formatCountList (value, emptyLabel = 'None') {
  if (!Array.isArray(value) || value.length === 0) return emptyLabel
  return value.join(', ')
}

function DetailCard ({ title, value, subtitle, icon }) {
  const Icon = icon

  return (
    <div className='bg-zinc-900/50 border border-zinc-800 p-5'>
      <div className='flex items-center justify-between mb-4'>
        <Icon className='text-sky-400' size={18} />
        <span className='text-[10px] uppercase text-zinc-600'>metadata</span>
      </div>
      <h3 className='text-sm text-white font-semibold break-words'>{value}</h3>
      <p className='text-zinc-500 text-sm mt-2'>{title}</p>
      {subtitle ? <p className='text-zinc-600 text-xs mt-2'>{subtitle}</p> : null}
    </div>
  )
}

function SectionBlock ({ title, content, icon }) {
  const Icon = icon

  return (
    <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
      <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
        <Icon className='text-sky-400' size={18} />
        <h2 className='text-xl font-bold text-white'>{title}</h2>
      </div>
      <div className='p-6'>
        <div className='whitespace-pre-wrap leading-relaxed text-zinc-300 bg-black/30 border border-zinc-800 p-5'>
          {content}
        </div>
      </div>
    </section>
  )
}

function BulletList ({ items, emptyLabel = 'None available' }) {
  if (!items || items.length === 0) {
    return <div className='text-zinc-500 text-sm'>{emptyLabel}</div>
  }

  return (
    <ul className='space-y-3'>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className='flex gap-3 text-zinc-300'>
          <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0' />
          <span className='leading-relaxed'>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ResumeAnalyzerDetail () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [execution, setExecution] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState('')

  useEffect(() => {
    let isActive = true

    const loadExecution = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await getResumeExecutionDetail(id)
        const normalized = normalizeResumeExecution(response?.data ?? response)

        if (isActive) {
          setExecution(normalized)
        }
      } catch (err) {
        if (isActive) {
          setError(
            err?.response?.data?.detail ||
              err?.response?.data?.message ||
              'Unable to load this resume execution.'
          )
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    if (id) {
      loadExecution()
    } else {
      setLoading(false)
      setError('Missing execution id.')
    }

    return () => {
      isActive = false
    }
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this resume execution?')) return

    setActionLoading('delete')

    try {
      await deleteResumeExecution(id)
      navigate(-1)
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          'Unable to delete this resume execution.'
      )
    } finally {
      setActionLoading('')
    }
  }

  const handleRetry = async () => {
    setActionLoading('retry')

    try {
      await retryResumeExecution(id)
      navigate(-1)
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          'Unable to retry this resume execution.'
      )
    } finally {
      setActionLoading('')
    }
  }

  if (loading) {
    return <LoadingGateway />
  }

  if (error || !execution) {
    return (
      <div className='min-h-screen bg-[#050505] text-zinc-300 font-mono flex items-center justify-center p-6'>
        <div className='max-w-lg w-full border border-zinc-800 bg-zinc-950 p-8 text-center space-y-5'>
          <div className='mx-auto w-fit p-3 border border-red-500/20 bg-red-500/10'>
            <CircleAlert className='text-red-400' size={24} />
          </div>
          <h1 className='text-2xl font-black text-white'>
            Resume execution not found
          </h1>
          <p className='text-zinc-500'>{error || 'No execution data returned.'}</p>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-colors'
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    )
  }

  const resumeAnalysis = execution.resumeAnalysis || {}
  const skillEvaluation = execution.skillEvaluation || {}
  const atsScore = execution.atsScore || {}
  const feedbackReport = execution.feedbackReport || {}

  return (
    <div className='flex min-h-screen bg-[#050505] text-zinc-300 font-mono'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full'>
          <div className='flex justify-end gap-3 flex-wrap'>
            <button
              onClick={handleDelete}
              disabled={actionLoading !== ''}
              className='inline-flex items-center gap-2 px-4 py-2.5 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50 text-sm font-semibold'
            >
              {actionLoading === 'delete' ? (
                <Loader2 size={16} className='animate-spin' />
              ) : (
                <Trash2 size={16} />
              )}
              Delete
            </button>

            {String(execution.status || '').toLowerCase() === 'failed' ? (
              <button
                onClick={handleRetry}
                disabled={actionLoading !== ''}
                className='inline-flex items-center gap-2 px-4 py-2.5 border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-all disabled:opacity-50 text-sm font-semibold'
              >
                {actionLoading === 'retry' ? (
                  <Loader2 size={16} className='animate-spin' />
                ) : (
                  <RotateCcw size={16} />
                )}
                Retry
              </button>
            ) : null}
          </div>

          <section className='border-b border-zinc-900 pb-6'>
            <button
              onClick={() => navigate(-1)}
              className='mb-5 flex items-center gap-2 text-zinc-500 hover:text-white transition-all'
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className='flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6'>
              <div className='min-w-0'>
                <div className='flex items-center gap-3 flex-wrap mb-3'>
                  <div className='p-3 bg-sky-500/10 border border-sky-500/20 shrink-0'>
                    <FileText className='text-sky-400' size={22} />
                  </div>
                  <div className='min-w-0'>
                    <h1 className='text-3xl font-black text-white leading-tight break-words'>
                      {execution.filename}
                    </h1>
                    <p className='text-zinc-500 text-sm mt-1'>
                      Full resume analysis and ATS breakdown
                    </p>
                  </div>
                </div>

                <div className='flex flex-wrap items-center gap-3 text-xs'>
                  <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-sky-400 uppercase'>
                    Execution Details
                  </span>
                  <span className='px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 uppercase'>
                    {execution.status}
                  </span>
                  <ScoreBadge score={execution.score} />
                  {execution.workflowExecutionId && (
                    <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase'>
                      Workflow Execution: {execution.workflowExecutionId}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-6 shrink-0'>
                <ScoreMeter score={execution.score} />
              </div>
            </div>
          </section>

          <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
            <DetailCard
              title='Clarity Score'
              value={`${execution.clarityScore}%`}
              subtitle='From resume_analysis.clarity_score'
              icon={Gauge}
            />
            <DetailCard
              title='Extracted Skills'
              value={execution.extractedSkillsCount}
              subtitle={formatCountList(skillEvaluation.extracted_skills)}
              icon={Sparkles}
            />
            <DetailCard
              title='ATS Issues'
              value={execution.atsIssuesCount}
              subtitle={atsScore.parse_friendly ? 'Parse friendly' : 'Needs cleanup'}
              icon={ShieldAlert}
            />
            <DetailCard
              title='Priority Actions'
              value={execution.priorityActionsCount}
              subtitle='Recommended next steps'
              icon={Target}
            />
          </section>

          <section className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
            <DetailCard
              title='Sections Found'
              value={execution.sectionsFoundCount}
              subtitle={formatCountList(resumeAnalysis.sections_found)}
              icon={Layers3}
            />
            <DetailCard
              title='Missing Sections'
              value={execution.missingSectionsCount}
              subtitle={formatCountList(resumeAnalysis.missing_sections)}
              icon={FolderSearch}
            />
            <DetailCard
              title='Keyword Hits'
              value={execution.keywordHits}
              subtitle={`Keyword misses: ${skillEvaluation.keyword_misses?.length || 0}`}
              icon={ListChecks}
            />
          </section>

          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <div className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
              <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
                <Database className='text-sky-400' size={18} />
                <h2 className='text-xl font-bold text-white'>Execution Metadata</h2>
              </div>
              <div className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>Created At</div>
                  <div className='text-sm text-zinc-200'>{formatDate(execution.time)}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>Updated At</div>
                  <div className='text-sm text-zinc-200'>{formatDate(execution.updatedAt)}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>File Type</div>
                  <div className='text-sm text-zinc-200'>{execution.fileType || 'N/A'}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>File Path</div>
                  <div className='text-sm text-zinc-200 break-all'>{execution.filePath || 'N/A'}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>Execution ID</div>
                  <div className='text-sm text-zinc-200 break-all'>{String(execution.id)}</div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>Error Message</div>
                  <div className='text-sm text-zinc-200 break-words'>
                    {execution.errorMessage || 'None'}
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
              <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
                <WandSparkles className='text-sky-400' size={18} />
                <h2 className='text-xl font-bold text-white'>AI Summary</h2>
              </div>
              <div className='p-6 space-y-4'>
                <div className='space-y-2'>
                  <div className='text-[10px] uppercase text-zinc-600'>Summary</div>
                  <p className='text-sm leading-relaxed text-zinc-300'>
                    {feedbackReport.summary || 'No summary available.'}
                  </p>
                </div>
                <div className='space-y-2'>
                  <div className='text-[10px] uppercase text-zinc-600'>Recommended Format</div>
                  <p className='text-sm text-zinc-300'>
                    {atsScore.recommended_format || 'N/A'}
                  </p>
                </div>
                <div className='space-y-2'>
                  <div className='text-[10px] uppercase text-zinc-600'>Parse Friendly</div>
                  <p className='text-sm text-zinc-300'>
                    {atsScore.parse_friendly ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <SectionBlock
            title='Resume Analysis'
            icon={Brain}
            content={[
              `Clarity Score: ${resumeAnalysis.clarity_score ?? 'N/A'}`,
              `Sections Found: ${formatCountList(resumeAnalysis.sections_found)}`,
              `Missing Sections: ${formatCountList(resumeAnalysis.missing_sections)}`,
              '',
              'Formatting Issues:',
              ...(Array.isArray(resumeAnalysis.formatting_issues) && resumeAnalysis.formatting_issues.length > 0
                ? resumeAnalysis.formatting_issues.map(issue => `- ${issue}`)
                : ['- None'])
            ].join('\n')}
          />

          <SectionBlock
            title='Skill Evaluation'
            icon={ListChecks}
            content={[
              `Keyword Hits: ${skillEvaluation.keyword_hits ?? 'N/A'}`,
              `Keyword Misses: ${formatCountList(skillEvaluation.keyword_misses)}`,
              `Extracted Skills: ${formatCountList(skillEvaluation.extracted_skills)}`,
              '',
              'Skill Gaps:',
              ...(Array.isArray(skillEvaluation.skill_gaps) && skillEvaluation.skill_gaps.length > 0
                ? skillEvaluation.skill_gaps.map(gap => `- ${gap}`)
                : ['- None'])
            ].join('\n')}
          />

          <SectionBlock
            title='ATS Analysis'
            icon={ShieldAlert}
            content={[
              `ATS Score: ${atsScore.ats_score ?? 'N/A'}`,
              `Parse Friendly: ${atsScore.parse_friendly ? 'Yes' : 'No'}`,
              `Recommended Format: ${atsScore.recommended_format ?? 'N/A'}`,
              '',
              'Issues:',
              ...(Array.isArray(atsScore.issues) && atsScore.issues.length > 0
                ? atsScore.issues.map(issue => `- ${issue}`)
                : ['- None'])
            ].join('\n')}
          />

          <SectionBlock
            title='Feedback Report'
            icon={Sparkles}
            content={[
              `Overall Score: ${feedbackReport.overall_score ?? execution.score}`,
              '',
              `Summary: ${feedbackReport.summary || 'N/A'}`,
              '',
              'ATS Tips:',
              ...(Array.isArray(feedbackReport.ats_tips) && feedbackReport.ats_tips.length > 0
                ? feedbackReport.ats_tips.map(tip => `- ${tip}`)
                : ['- None']),
              '',
              'Priority Actions:',
              ...(Array.isArray(feedbackReport.priority_actions) && feedbackReport.priority_actions.length > 0
                ? feedbackReport.priority_actions.map(action => `- ${action}`)
                : ['- None'])
            ].join('\n')}
          />

          <SectionBlock
            title='Raw Resume Text'
            icon={FileCode2}
            content={execution.rawText || 'No raw text available.'}
          />
        </main>
      </div>
    </div>
  )
}
