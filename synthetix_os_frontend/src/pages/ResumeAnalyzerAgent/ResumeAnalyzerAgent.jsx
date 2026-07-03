import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import { analyzeResumeExecution } from '@/api/auth'
import { getResumeExecutions } from '@/api/resumeExecutions'
import PastExecutions from './components/PastExecution'
import ResultModal from './components/ResultModal'
import StatsBar from './components/StatsBar'
import NewTaskForm from './components/NewTaskForm'
import AgentHeader from './components/AgentHeader'
import {
  normalizeResumeExecutionsPaginatedResponse
} from './components/analysisUtils'

export default function ResumeAnalyzer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [executions, setExecutions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [file, setFile] = useState(null)
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [activeStage, setActiveStage] = useState(null)
  const [viewResult, setViewResult] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [taskStatus, setTaskStatus] = useState('idle')
  const [connected, setConnected] = useState(false)
  const fileInputRef = useRef(null)
  const stageTimerRef = useRef(null)
  const wsRef = useRef(null)
  const retryTimeoutRef = useRef(null)
  const loadingRef = useRef(false)
  const pendingWorkflowExecutionIdRef = useRef(null)

  const loadExecutions = useCallback(
    async ({ silent = false, page = currentPage } = {}) => {
      if (!silent) {
        setHistoryLoading(true)
      }

      try {
        const response = await getResumeExecutions({ page })
        const normalized = normalizeResumeExecutionsPaginatedResponse(response)

        setExecutions(normalized.items)
        setTotalCount(normalized.count)
        setTotalPages(Math.max(1, Math.ceil(normalized.count / 5)))

        return normalized.items
      } catch (err) {
        console.error('Failed to load resume executions', err)
        return []
      } finally {
        if (!silent) {
          setHistoryLoading(false)
        }
      }
    },
    [currentPage]
  )

  const loadExecutionsRef = useRef(loadExecutions)

  useEffect(() => {
    loadingRef.current = loading
  }, [loading])

  useEffect(() => {
    loadExecutionsRef.current = loadExecutions
  }, [loadExecutions])

  useEffect(() => {
    loadExecutions()
  }, [loadExecutions])

  useEffect(() => {
    return () => {
      if (stageTimerRef.current) {
        clearInterval(stageTimerRef.current)
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      wsRef.current?.close()
    }
  }, [])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const stopStageAnimation = () => {
    if (stageTimerRef.current) {
      clearInterval(stageTimerRef.current)
      stageTimerRef.current = null
    }
  }

  const startStageAnimation = () => {
    stopStageAnimation()
    setActiveStage(0)

    stageTimerRef.current = setInterval(() => {
      setActiveStage(prev => {
        if (prev === null) return 0
        if (prev >= 2) return 2
        return prev + 1
      })
    }, 900)
  }

  const getWorkflowExecutionId = payload => {
    return (
      payload?.workflow_execution_id ??
      payload?.workflowExecutionId ??
      payload?.execution_id ??
      payload?.executionId ??
      payload?.id ??
      null
    )
  }

  const isCompletedEvent = payload => {
    const status = String(payload?.status || '').toLowerCase()
    const event = String(payload?.event || '').toLowerCase()

    return (
      status === 'completed' ||
      status === 'success' ||
      event.includes('completed') ||
      event.includes('success')
    )
  }

  const isFailedEvent = payload => {
    const status = String(payload?.status || '').toLowerCase()
    const event = String(payload?.event || '').toLowerCase()

    return (
      status === 'failed' ||
      status === 'error' ||
      event.includes('failed') ||
      event.includes('error')
    )
  }

  const matchesPendingExecution = (execution, pendingId) => {
    if (!pendingId) return false

    return [execution?.workflowExecutionId, execution?.id].some(value => {
      if (value === null || value === undefined) return false
      return String(value) === String(pendingId)
    })
  }

  useEffect(() => {
    if (!id) return

    let cancelled = false

    const connect = () => {
      if (cancelled) return

      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
      const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL || '127.0.0.1:8000'
      const ws = new WebSocket(`${protocol}://${wsBaseUrl}/ws/agents/${id}/`)

      wsRef.current = ws

      ws.onopen = () => {
        if (cancelled) return
        setConnected(true)
      }

      ws.onclose = () => {
        if (cancelled) return

        setConnected(false)

        if (loadingRef.current) {
          retryTimeoutRef.current = setTimeout(connect, 2000)
        }
      }

      ws.onerror = () => {
        if (cancelled) return
        setConnected(false)
      }

      ws.onmessage = async event => {
        let data
        console.log("WS Message:", data)

        try {
          data = JSON.parse(event.data)
        } catch (parseError) {
          console.error('Failed to parse workflow socket payload', parseError)
          return
        }

        const incomingWorkflowExecutionId = getWorkflowExecutionId(data)
        const pendingWorkflowExecutionId =
          pendingWorkflowExecutionIdRef.current

        if (
          pendingWorkflowExecutionId &&
          incomingWorkflowExecutionId &&
          String(incomingWorkflowExecutionId) !==
            String(pendingWorkflowExecutionId)
        ) {
          return
        }

        if (data.message) {
          setMessage(data.message)
        }

        if (data.status === 'processing' || data.event === 'task_processing') {
          setTaskStatus('processing')
          return
        }

        if (isCompletedEvent(data)) {
          pendingWorkflowExecutionIdRef.current = null
          setTaskStatus('completed')
          setMessage(data.message || 'Resume analysis completed.')
          stopStageAnimation()
          loadingRef.current = false
          setLoading(false)
          setActiveStage(null)

          const refreshedExecutions = await loadExecutionsRef.current({
            silent: true
          })
          const matchingExecution = refreshedExecutions.find(ex =>
            matchesPendingExecution(ex, incomingWorkflowExecutionId)
          )

          setViewResult(matchingExecution || null)
          resetForm()
          return
        }

        if (isFailedEvent(data)) {
          pendingWorkflowExecutionIdRef.current = null
          setTaskStatus('failed')
          setError(
            data.message ||
              'Resume analysis failed. Please check the file and try again.'
          )
          stopStageAnimation()
          loadingRef.current = false
          setLoading(false)
          setActiveStage(null)
          await loadExecutionsRef.current({ silent: true })
        }
      }
    }

    connect()

    return () => {
      cancelled = true

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }

      wsRef.current?.close()
    }
  }, [id])

  const resetForm = () => {
    setFile(null)
    setJobTitle('')
    setJobDescription('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (!file || loading) return

    setError('')
    setMessage('')
    setTaskStatus('processing')
    pendingWorkflowExecutionIdRef.current = null
    loadingRef.current = true
    setLoading(true)
    setCurrentPage(1)
    startStageAnimation()

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('job_title', jobTitle.trim())
      formData.append('job_description', jobDescription.trim())

      const response = await analyzeResumeExecution(formData)
      pendingWorkflowExecutionIdRef.current = getWorkflowExecutionId(
        response?.data ?? response
      )
      setMessage(
        'Resume analysis submitted. Waiting for backend completion...'
      )
      setViewResult(null)
    } catch (err) {
      pendingWorkflowExecutionIdRef.current = null
      setTaskStatus('failed')
      const apiMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Resume analysis failed. Please check the file and try again.'

      setError(apiMessage)
      stopStageAnimation()
      loadingRef.current = false
      setLoading(false)
      setActiveStage(null)
    }
  }

  const handleOpenDetail = execution => {
    navigate(`/resume-analyzer/executions/${execution.id}`)
  }

  return (
    <div className='flex bg-[#050505] min-h-screen text-zinc-300 font-mono'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='min-h-screen bg-[#050505] text-zinc-300 font-mono p-6 lg:p-10 space-y-8'>
          <AgentHeader />
          {message ? (
            <div
              className={`border px-4 py-3 text-sm ${
                taskStatus === 'failed'
                  ? 'border-red-500/20 bg-red-500/10 text-red-300'
                  : taskStatus === 'completed'
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  : 'border-sky-500/20 bg-sky-500/10 text-sky-300'
              }`}
            >
              {message}
            </div>
          ) : null}
          <div className='flex items-center gap-3 text-xs text-zinc-500'>
            <span
              className={`px-3 py-1 border uppercase ${
                taskStatus === 'processing'
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                  : taskStatus === 'completed'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : taskStatus === 'failed'
                  ? 'border-red-500/30 bg-red-500/10 text-red-300'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-500'
              }`}
            >
              {taskStatus === 'processing'
                ? 'PROCESSING'
                : taskStatus === 'completed'
                ? 'COMPLETED'
                : taskStatus === 'failed'
                ? 'FAILED'
                : 'IDLE'}
            </span>
            <span>
              {connected ? ' connected' : ' disconnected'}
            </span>
          </div>
          <StatsBar executions={executions} />

          <section className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
            <NewTaskForm
              file={file}
              targetRole={jobTitle}
              jobDescription={jobDescription}
              onFileChange={e => setFile(e.target.files?.[0] || null)}
              onTargetRoleChange={setJobTitle}
              onJobDescriptionChange={setJobDescription}
              onSubmit={handleSubmit}
              loading={loading}
              activeStage={activeStage}
              error={error}
              fileInputRef={fileInputRef}
            />


              <div className='bg-zinc-900/40 border border-zinc-800 p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <ShieldCheck className='text-sky-400' size={18} />
                  <h2 className='text-lg font-bold text-white'>CAPABILITIES</h2>
                </div>
                <div className='space-y-2 mb-6'>
                  {[
                    'resume_parsing',
                    'ats_analysis',
                    'skill_extraction',
                    'gap_detection',
                    'resume_scoring',
                    'improvement_recommendations',
                    'execution_history'
                  ].map(capability => (
                    <div
                      key={capability}
                      className='flex items-center gap-3 text-sm'
                    >
                      <div className='w-1.5 h-1.5 rounded-full bg-sky-500' />
                      <span className='text-zinc-400'>{capability}</span>
                    </div>
                  ))}
                </div>
                <div className='pt-4 border-t border-zinc-800 space-y-3'>
                  <div>
                    <div className='text-xs text-zinc-600 mb-1'>AI MODEL</div>
                    <div className='text-sm text-sky-300'>backend-driven</div>
                  </div>
                  <div>
                    <div className='text-xs text-zinc-600 mb-1'>
                      OUTPUT STYLE
                    </div>
                    <div className='text-sm text-zinc-300'>
                      structured_report
                    </div>
                  </div>
                  <div>
                    <div className='text-xs text-zinc-600 mb-1'>
                      ACCEPTED FORMATS
                    </div>
                    <div className='text-sm text-zinc-300'>.pdf · .docx</div>
                  </div>
                </div>
              </div>
            </section>

          <PastExecutions
            executions={executions}
            onView={handleOpenDetail}
            loading={historyLoading}
          />

          <div className='flex items-center justify-between p-6 border-t border-zinc-800 bg-zinc-900/40'>
            <div className='text-sm text-zinc-500'>
              Total Results: {totalCount}
            </div>

            <div className='flex items-center gap-3'>
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className='px-4 py-2 border border-zinc-700 disabled:opacity-50'
              >
                Previous
              </button>

              <span className='text-sm text-zinc-400'>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className='px-4 py-2 border border-zinc-700 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
          <ResultModal result={viewResult} onClose={() => setViewResult(null)} />
        </main>
      </div>
    </div>
  )
}
