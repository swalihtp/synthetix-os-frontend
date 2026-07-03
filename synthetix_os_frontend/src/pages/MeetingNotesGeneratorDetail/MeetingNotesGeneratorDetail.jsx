import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  CheckSquare,
  CircleAlert,
  Loader2,
  FileText,
  ListTodo,
  MessageSquareQuote,
  Sparkles,
  FileSearch,
  ClipboardList,
  Brain,
  Database,
  Layers3,
  RotateCcw,
  Trash2
} from 'lucide-react'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import LoadingGateway from '@/components/ui/LoadingGateway'
import ResultBadge from '@/pages/NoteGeneratorAgent/components/ResultBadge'
import {
  getMeetingSummaryExecutionDetail,
  deleteMeetingSummaryExecution,
  retryMeetingSummaryExecution
} from '@/api/meetingSummaryExecutions'
import { normalizeMeetingSummaryExecution } from '@/pages/NoteGeneratorAgent/components/analysisUtils'
import SectionCard from './components/SectionCard'
import BulletList from './components/BulletList'
import DetailCard from './components/DetailCard'
import { formatDate } from './components/analysisUtils'

export default function MeetingNotesGeneratorDetail () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [execution, setExecution] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState('')

  useEffect(() => {
    let active = true

    const loadExecution = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await getMeetingSummaryExecutionDetail(id)
        const normalized = normalizeMeetingSummaryExecution(
          response?.data ?? response
        )

        if (active) {
          setExecution(normalized)
        }
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.detail ||
              err?.response?.data?.message ||
              'Unable to load this meeting execution.'
          )
        }
      } finally {
        if (active) {
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
      active = false
    }
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this meeting notes execution?')) return

    setActionLoading('delete')

    try {
      await deleteMeetingSummaryExecution(id)
      navigate(-1)
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          'Unable to delete this meeting execution.'
      )
    } finally {
      setActionLoading('')
    }
  }

  const handleRetry = async () => {
    setActionLoading('retry')

    try {
      await retryMeetingSummaryExecution(id)
      navigate(-1)
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          'Unable to retry this meeting execution.'
      )
    } finally {
      setActionLoading('')
    }
  }

  if (loading) return <LoadingGateway />

  if (error || !execution) {
    return (
      <div className='min-h-screen bg-[#050505] text-zinc-300 font-mono flex items-center justify-center p-6'>
        <div className='max-w-lg w-full border border-zinc-800 bg-zinc-950 p-8 text-center space-y-5'>
          <div className='mx-auto w-fit p-3 border border-red-500/20 bg-red-500/10'>
            <CircleAlert className='text-red-400' size={24} />
          </div>
          <h1 className='text-2xl font-black text-white'>
            Meeting execution not found
          </h1>
          <p className='text-zinc-500'>
            {error || 'No execution data returned.'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors'
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    )
  }

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
                className='inline-flex items-center gap-2 px-4 py-2.5 border border-violet-500/30 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all disabled:opacity-50 text-sm font-semibold'
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
                  <div className='p-3 bg-violet-500/10 border border-violet-500/20 shrink-0'>
                    <FileText className='text-violet-400' size={22} />
                  </div>
                  <div className='min-w-0'>
                    <h1 className='text-3xl font-black text-white leading-tight break-words'>
                      {execution.title}
                    </h1>
                    <p className='text-zinc-500 text-sm mt-1'>
                      {execution.filename}
                    </p>
                  </div>
                </div>

                <div className='flex flex-wrap items-center gap-3 text-xs'>
                  <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-violet-400 uppercase'>
                    Meeting Summary
                  </span>
                  <span className='px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 uppercase'>
                    {execution.summaryStyle}
                  </span>
                  <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase'>
                    {execution.status}
                  </span>
                  {execution.workflowExecutionId && (
                    <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase break-all'>
                      Workflow: {execution.workflowExecutionId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
            <DetailCard
              title='Topics'
              value={execution.topicsCount}
              subtitle='Topics extracted from transcript'
              icon={Layers3}
            />
            <DetailCard
              title='Decisions'
              value={execution.decisionsCount}
              subtitle='Recorded decisions'
              icon={CheckSquare}
            />
            <DetailCard
              title='Action Items'
              value={execution.actionItemsCount}
              subtitle='Tracked follow-ups'
              icon={ListTodo}
            />
            <DetailCard
              title='Blockers'
              value={execution.blockersCount}
              subtitle='Issues called out in summary'
              icon={FileSearch}
            />
          </section>

          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <div className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
              <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
                <Database className='text-violet-400' size={18} />
                <h2 className='text-xl font-bold text-white'>
                  Execution Metadata
                </h2>
              </div>
              <div className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Created At
                  </div>
                  <div className='text-sm text-zinc-200'>
                    {formatDate(execution.time)}
                  </div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Updated At
                  </div>
                  <div className='text-sm text-zinc-200'>
                    {formatDate(execution.updatedAt)}
                  </div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    File Type
                  </div>
                  <div className='text-sm text-zinc-200'>
                    {execution.fileType || 'N/A'}
                  </div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    File Path
                  </div>
                  <div className='text-sm text-zinc-200 break-all'>
                    {execution.filePath || 'N/A'}
                  </div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Summary Style
                  </div>
                  <div className='text-sm text-zinc-200'>
                    {execution.summaryStyleLabel}
                  </div>
                </div>
                <div className='space-y-1'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Error Message
                  </div>
                  <div className='text-sm text-zinc-200 break-words'>
                    {execution.errorMessage || 'None'}
                  </div>
                </div>
              </div>
            </div>

            <SectionCard title='Meeting Summary' icon={Brain}>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Summary
                  </div>
                  <p className='text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap'>
                    {execution.summary || 'No summary available.'}
                  </p>
                </div>
                <div className='space-y-2'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Next Steps
                  </div>
                  <p className='text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap'>
                    {execution.nextSteps || 'No next steps available.'}
                  </p>
                </div>
                <div className='space-y-2'>
                  <div className='text-[10px] uppercase text-zinc-600'>
                    Summary Style
                  </div>
                  <ResultBadge style={execution.summaryStyle} />
                </div>
              </div>
            </SectionCard>
          </section>

          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <SectionCard title='Topics Discussed' icon={MessageSquareQuote}>
              <BulletList
                items={execution.topics.map(topic => {
                  if (typeof topic === 'string') return topic
                  const name =
                    topic.topic || topic.title || topic.name || 'Topic'
                  const summary = topic.summary ? ` - ${topic.summary}` : ''
                  const speakers =
                    Array.isArray(topic.speakers) && topic.speakers.length > 0
                      ? ` (Speakers: ${topic.speakers.join(', ')})`
                      : ''
                  return `${name}${summary}${speakers}`
                })}
                emptyLabel='No topics extracted.'
              />
            </SectionCard>

            <SectionCard title='Decisions' icon={ClipboardList}>
              <BulletList
                items={execution.decisions.map(decision => {
                  if (typeof decision === 'string') return decision
                  const madeBy =
                    decision.made_by || decision.madeBy || 'Unknown'
                  const context = decision.context
                    ? ` - ${decision.context}`
                    : ''
                  return `${madeBy}: ${
                    decision.decision || 'Decision recorded.'
                  }${context}`
                })}
                emptyLabel='No decisions recorded.'
              />
            </SectionCard>
          </section>

          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <SectionCard title='Action Items' icon={Sparkles}>
              <BulletList
                items={execution.actionItems.map(action => {
                  if (typeof action === 'string') return action
                  const owner = action.owner || 'Unassigned'
                  const due = action.due ? ` Due: ${action.due}` : ''
                  const topic = action.topic ? ` Topic: ${action.topic}` : ''
                  return `${owner}: ${
                    action.task || 'Action item'
                  }${due}${topic}`
                })}
                emptyLabel='No action items extracted.'
              />
            </SectionCard>

            <SectionCard title='Blockers' icon={CircleAlert}>
              <BulletList
                items={execution.blockers}
                emptyLabel='No blockers reported.'
              />
            </SectionCard>
          </section>

          <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
            <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
              <FileText className='text-violet-400' size={18} />
              <h2 className='text-xl font-bold text-white'>Raw Transcript</h2>
            </div>
            <div className='p-6'>
              <div className='whitespace-pre-wrap leading-relaxed text-zinc-300 bg-black/30 border border-zinc-800 p-5 max-h-[32rem] overflow-y-auto'>
                {execution.rawTranscript || 'No transcript available.'}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
