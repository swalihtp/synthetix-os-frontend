import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import LoadingGateway from '@/components/ui/LoadingGateway'

import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import { useState, useRef, useEffect } from 'react'

import {
  Mail,
  ShieldAlert,
  Clock3,
  Brain,
  CheckCircle2,
  UserRound,
  ArrowRight,
  Wifi,
  Activity,
  Circle
} from 'lucide-react'

import {
  fetchEmailExecutions,
  setCurrentPage,
  setSelectedResult,
  fetchEmailAgentDashboard
} from '../../../store/slices/emailAgentSlice'

const filters = [
  { label: 'All', value: 'ALL' },
  { label: 'Human Review', value: 'HUMAN_REVIEW' },
  { label: 'Auto Resolved', value: 'AUTO_RESOLVED' },
  { label: 'Skipped', value: 'SKIPPED' },
  { label: 'Failed', value: 'FAILED' }
]

export default function EmailAgentDashboard () {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    dashboard,
    dashboardLoading,
    selectedResult,
    currentPage,
    totalPages,
    totalCount,
    reviewLoading,
    emailExecutions
  } = useSelector(state => state.emailAgent)

  const agent = dashboard?.agent
  const stats = dashboard?.stats

  const [agentStatus, setAgentStatus] = useState('idle')

  const [progress, setProgress] = useState(0)

  const [currentLog, setCurrentLog] = useState('Waiting for emails...')

  const [currentStep, setCurrentStep] = useState(null)

  const [logs, setLogs] = useState([])

  const [connected, setConnected] = useState(false)

  const wsRef = useRef(null)

  const workflowSteps = [
    'Deduplicate',
    'Fetching',
    'Extracting',
    'Processing',
    'AI reasoning',
    'Sending reply'
  ]

  useEffect(() => {
    if (!id) return

    dispatch(fetchEmailAgentDashboard(id))

    dispatch(
      fetchEmailExecutions({
        agentId: id,
        page: currentPage,
        result: selectedResult
      })
    )
  }, [dispatch, id, currentPage, selectedResult])

  useEffect(() => {
    if (!id) return

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

    const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL || 'localhost:8000'

    const ws = new WebSocket(`${protocol}://${wsBaseUrl}/ws/agents/${id}/`)

    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
    }

    ws.onclose = () => {
      setConnected(false)

      setAgentStatus('idle')
    }

    ws.onerror = () => {
      setConnected(false)
    }

    ws.onmessage = event => {
      const data = JSON.parse(event.data)

      setAgentStatus('active')

      if (data.progress !== undefined) {
        setProgress(data.progress)
      }

      if (data.log) {
        setCurrentLog(data.log)

        setLogs(prev =>
          [
            {
              message: data.log,
              time: new Date().toLocaleTimeString()
            },
            ...prev
          ].slice(0, 15)
        )
      }

      if (data.step) {
        setCurrentStep(data.step)
      }

      if (data.progress === 100) {
        setTimeout(() => {
          setAgentStatus('idle')
          setCurrentLog('Waiting for emails...')
        }, 2000)
      }
    }

    return () => {
      ws.close()
    }
  }, [id])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  if (dashboardLoading || !dashboard) {
    return <LoadingGateway />
  }

  return (
    <div className='flex bg-[#050505] min-h-screen text-zinc-300 font-mono'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='p-6 lg:p-10 space-y-8'>
          {/* HEADER */}
          <section className='border-b border-zinc-900 pb-6'>
            <div className='flex items-center justify-between flex-wrap gap-6'>
              <div>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-3 bg-emerald-500 text-black rounded-lg'>
                    <Mail size={22} />
                  </div>

                  <div>
                    <h1 className='text-3xl font-black text-white'>
                      {agent?.name}
                    </h1>

                    <p className='text-zinc-500 text-sm mt-1'>
                      {agent?.description}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3 text-xs'>
                  <span className='px-3 py-1 bg-zinc-900 border border-zinc-800 text-emerald-400'>
                    AGENT_ID: {id}
                  </span>

                  <span className='px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'>
                    {agent?.is_active ? 'Active' : 'Not Active'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            {[
              {
                title: 'Emails Processed',
                value: stats?.processed_emails || 0,
                icon: Brain
              },
              {
                title: 'Human Reviews',
                value: stats?.human_reviews || 0,
                icon: UserRound
              },
              {
                title: 'Auto Resolved',
                value: `${stats?.auto_resolved_percentage || 0}%`,
                icon: CheckCircle2
              },
              {
                title: 'Pending Queue',
                value: stats?.pending_reviews || 0,
                icon: Clock3
              }
            ].map(item => (
              <div
                key={item.title}
                className='bg-zinc-900/50 border border-zinc-800 p-5'
              >
                <div className='flex items-center justify-between mb-4'>
                  <item.icon className='text-emerald-500' size={18} />

                  <span className='text-[10px] uppercase text-zinc-600'>
                    realtime
                  </span>
                </div>

                <h3 className='text-3xl font-black text-white'>{item.value}</h3>

                <p className='text-zinc-500 text-sm mt-2'>{item.title}</p>
              </div>
            ))}
          </section>

          <section className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
            {/* STATUS CARD */}
            <div className='xl:col-span-1 bg-zinc-900/40 border border-zinc-800 p-6'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <Activity className='text-emerald-400' size={18} />

                  <h2 className='text-lg font-bold text-white'>AGENT_STATUS</h2>
                </div>

                <div
                  className={`flex items-center gap-2 text-xs px-3 py-1 border ${
                    agentStatus === 'active'
                      ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                      : 'border-zinc-700 text-zinc-400 bg-zinc-800'
                  }`}
                >
                  <Circle size={8} fill='currentColor' />

                  {agentStatus === 'active' ? 'ACTIVE' : 'SLEEPING'}
                </div>
              </div>

              <div className='space-y-5'>
                <div>
                  <div className='text-xs uppercase text-zinc-500 mb-2'>
                    Current Action
                  </div>

                  <div className='text-white font-medium'>{currentLog}</div>
                </div>

                <div>
                  <div className='flex justify-between text-xs mb-2'>
                    <span className='text-zinc-500'>Progress</span>

                    <span className='text-emerald-400'>{progress}%</span>
                  </div>

                  <div className='w-full bg-zinc-800 h-2 overflow-hidden'>
                    <div
                      className='h-full bg-emerald-500 transition-all duration-500'
                      style={{
                        width: `${progress}%`
                      }}
                    />
                  </div>
                </div>

                <div className='flex items-center gap-2 text-xs text-zinc-500'>
                  <Wifi size={14} />

                  {connected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
                </div>
              </div>
            </div>

            {/* WORKFLOW */}
            <div className='xl:col-span-1 bg-zinc-900/40 border border-zinc-800 p-6'>
              <div className='flex items-center gap-3 mb-6'>
                <Brain className='text-emerald-400' size={18} />

                <h2 className='text-lg font-bold text-white'>WORKFLOW</h2>
              </div>

              <div className='space-y-4'>
                {workflowSteps.map((step, index) => {
                  const isDone = currentStep && index < currentStep.index

                  const isRunning = currentStep && index === currentStep.index

                  return (
                    <div key={step} className='flex items-center gap-3'>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isDone
                            ? 'bg-emerald-500'
                            : isRunning
                            ? 'bg-yellow-400 animate-pulse'
                            : 'bg-zinc-700'
                        }`}
                      />

                      <span
                        className={`text-sm ${
                          isDone
                            ? 'text-emerald-400'
                            : isRunning
                            ? 'text-white'
                            : 'text-zinc-500'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* LIVE LOGS */}
            <div className='xl:col-span-1 bg-zinc-900/40 border border-zinc-800 p-6'>
              <div className='flex items-center gap-3 mb-6'>
                <Clock3 className='text-emerald-400' size={18} />

                <h2 className='text-lg font-bold text-white'>LIVE_LOGS</h2>
              </div>

              <div className='space-y-3 max-h-[320px] overflow-y-auto'>
                {logs.length === 0 ? (
                  <div className='text-zinc-500 text-sm'>
                    Waiting for workflow events...
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div
                      key={index}
                      className='border-l-2 border-zinc-700 pl-3'
                    >
                      <div className='text-[10px] text-zinc-600 mb-1'>
                        {log.time}
                      </div>

                      <div className='text-sm text-zinc-300'>{log.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <div className='flex gap-3 flex-wrap p-6 border-b border-zinc-800'>
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => {
                  dispatch(setSelectedResult(filter.value))
                }}
                className={`
        px-4 py-2 text-sm border transition-all

        ${
          selectedResult === filter.value
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
        }
      `}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* EMAIL EXECUTIONS */}
          <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
            {/* HEADER */}
            <div className='border-b border-zinc-800 p-6 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-yellow-500/10 border border-yellow-500/20'>
                  <ShieldAlert className='text-yellow-400' size={18} />
                </div>

                <div>
                  <h2 className='text-xl font-bold text-white'>
                    {selectedResult === 'ALL'
                      ? 'EMAIL EXECUTIONS'
                      : selectedResult.replaceAll('_', ' ')}
                  </h2>
                </div>
              </div>

              <div className='text-xs px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'>
                {totalCount} EMAILS
              </div>
            </div>

            {/* BODY */}
            <div className='divide-y divide-zinc-800'>
              {reviewLoading ? (
                <div className='p-6 text-zinc-500'>Loading emails...</div>
              ) : emailExecutions.length === 0 ? (
                <div className='p-6 text-zinc-500'>No emails found</div>
              ) : (
                emailExecutions.map((email, i) => {
                  console.log(email)

                  return (
                    <motion.div
                      key={email.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className='p-6 hover:bg-zinc-900 transition-all cursor-pointer group'
                    >
                      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-3 flex-wrap mb-3'>
                            <span className='text-white font-semibold'>
                              {email.subject}
                            </span>

                            <span
                              className={`
                              text-[10px] px-2 py-1 border uppercase

                              ${
                                email.priority === 'CRITICAL'
                                  ? 'border-red-500/30 text-red-400 bg-red-500/10'
                                  : email.priority === 'HIGH'
                                  ? 'border-orange-500/30 text-orange-400 bg-orange-500/10'
                                  : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                              }
                            `}
                            >
                              {email.priority}
                            </span>
                            <span
                              className={`
    text-[10px] px-2 py-1 border uppercase

    ${
      email.result === 'AUTO_RESOLVED'
        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
        : email.result === 'HUMAN_REVIEW'
        ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
        : email.result === 'SKIPPED'
        ? 'border-zinc-500/30 text-zinc-400 bg-zinc-500/10'
        : 'border-red-500/30 text-red-400 bg-red-500/10'
    }
  `}
                            >
                              {email.result?.replaceAll('_', ' ')}
                            </span>
                          </div>

                          <div className='space-y-2 text-sm'>
                            <div className='text-zinc-400'>
                              From:
                              <span className='text-zinc-200 ml-2'>
                                {email.sender}
                              </span>
                            </div>

                            <div className='text-zinc-500'>
                              Status Reason:
                              <span className='text-yellow-400 ml-2'>
                                {email.reason}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center gap-6'>
                          <div className='text-right'>
                            <div className='text-xs text-zinc-600 uppercase'>
                              processed
                            </div>

                            <div className='text-sm text-zinc-300 mt-1'>
                              {new Date(email.time).toLocaleString()}{' '}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              navigate(
                                `/dashboard/email-executions/${email.id}`
                              )
                            }}
                            className='flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:border-emerald-500 hover:text-emerald-400 transition-all text-sm'
                          >
                            {email.result === 'HUMAN_REVIEW'
                              ? 'Review'
                              : 'View'}

                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
              <div className='flex items-center justify-between p-6 border-t border-zinc-800'>
                <div className='text-sm text-zinc-500'>
                  Total Emails: {totalCount}
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
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
