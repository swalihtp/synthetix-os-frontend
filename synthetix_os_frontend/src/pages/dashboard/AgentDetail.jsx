import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from '@/components/ui/badge'
import {
  Activity,
  Clock,
  ListChecks,
  Terminal as TerminalIcon,
  Cpu,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function AgentDetail () {
  const { id } = useParams()
  const agent = useSelector(state =>
    state.agents.items.find(a => String(a.id) === id)
  )
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(0)
  const [steps, setSteps] = useState([])
  const logsEndRef = useRef(null)

  // real-time updates via WebSocket
  useEffect(() => {
    if (!id) return

    let ws
    let retryTimeout

    const connect = () => {
      ws = new WebSocket(`ws://localhost:8000/ws/agents/${id}/`)

      ws.onopen = () => {
        console.log('WebSocket connected')
      }

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data)

          if (data.log) {
            setLogs(prev => [...prev.slice(-100), data.log]) // limit size
          }

          if (data.progress !== undefined) {
            setProgress(data.progress)
          }

          if (data.step) {
            setSteps(prev => {
              const updated = [...prev]
              
              // Fill missing indices with empty step objects to prevent sparse array
              while (updated.length <= data.step.index) {
                updated.push({
                  name: 'Unknown Step',
                  status: 'pending'
                })
              }

              // Now safely update the step
              updated[data.step.index] = {
                name: data.step.name || updated[data.step.index]?.name || 'Unknown Step',
                status: data.step.status
              }

              return updated
            })
          }
        } catch (err) {
          console.error('WS parse error', err)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected... reconnecting')
        retryTimeout = setTimeout(connect, 2000) // auto reconnect
      }
    }

    connect()

    return () => {
      ws?.close()
      clearTimeout(retryTimeout)
    }
  }, [id])

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Initialize logs, progress, and steps when agent data is loaded
  useEffect(() => {
    if (agent) {
      setLogs(agent.logs || [])
      setProgress(agent.progress || 0)
      setSteps(agent.steps || [])
    }
  }, [agent])

  // Handle case where agent is not found (e.g., invalid ID)
  if (!agent)
    return (
      <div className='p-20 text-center font-mono text-red-500'>
        [!] ERROR: NODE_OFFLINE
      </div>
    )

  return (
    <div className='min-h-screen bg-[#050505] p-6 lg:p-10 font-mono text-zinc-300'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* HEADER SECTION */}
        <div className='flex flex-col md:flex-row justify-between items-start border-l border-emerald-500/50 pl-6 mb-12'>
          <div className='space-y-1'>
            {/* NAVIGATION */}
            <button
              onClick={() => navigate('/agents')} // or navigate(-1)
              className='group flex items-center gap-2 mb-6 text-zinc-600 hover:text-emerald-500 transition-colors'
            >
              <span className='text-[10px] tracking-[0.3em] font-black uppercase'>
                {'<'} Return_to_Registry
              </span>
            </button>
            <div className='flex items-center gap-2 text-emerald-500/50 text-[10px] tracking-[0.3em] uppercase'>
              <Cpu size={12} />
              Neural_Node_Diagnostics
            </div>
            <h1 className='text-4xl font-black text-white uppercase tracking-tighter'>
              {agent.name}
            </h1>
            <p className='text-[11px] text-zinc-600 tracking-wider lowercase mt-1'>
              _manifest: {agent.description}
            </p>
          </div>
          <div className='flex flex-col items-end gap-1'>
            <Badge className='bg-emerald-500/10 border border-emerald-500/40 text-emerald-500 rounded-none px-3 py-0.5 text-[9px] font-black tracking-widest'>
              ● ACTIVE_NODE
            </Badge>
            <span className='text-[9px] text-zinc-800 uppercase tracking-widest'>
              Uplink: Stable
            </span>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* MAIN COLUMN */}
          <div className='lg:col-span-2 space-y-6'>
            {/* PURPOSE & PROCESSING */}
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='bg-zinc-900/10 border border-zinc-900 p-5 relative'>
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em] mb-4'>
                  _Primary_Objective
                </h2>
                <p className='text-[11px] text-zinc-500 leading-relaxed italic border-l border-zinc-800 pl-4'>
                  "{agent.description || 'Null sequence detected.'}"
                </p>
              </div>

              <div className='bg-zinc-900/10 border border-zinc-900 p-5'>
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em] mb-4 flex items-center gap-2'>
                  <Activity size={10} className='text-emerald-500' />{' '}
                  _Current_Processing
                </h2>
                <div className='space-y-3'>
                  <div className='flex justify-between text-[10px]'>
                    <span className='text-zinc-400 uppercase'>
                      {agent.current_task || 'Idle'}
                    </span>
                    <span className='text-emerald-500 font-bold'>
                      {progress}%
                    </span>
                  </div>
                  <div className='h-0.5 bg-zinc-900 overflow-hidden'>
                    <div
                      className='h-full bg-emerald-500 transition-all duration-700'
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* WORKFLOW SEQUENCER */}
            <div className='bg-zinc-900/10 border border-zinc-900'>
              <div className='p-4 border-b border-zinc-900 flex items-center gap-2'>
                <ListChecks size={12} className='text-zinc-500' />
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]'>
                  _Workflow_Sequencer
                </h2>
              </div>
              <div className='divide-y divide-zinc-900'>
                {steps.filter(Boolean).map((step, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center p-3 px-5 transition-colors ${
                      step.status === 'running' ? 'bg-emerald-500/2' : ''
                    }`}
                  >
                    <div className='flex items-center gap-4'>
                      <span className='text-[10px] text-zinc-800 font-bold'>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[11px] uppercase tracking-wide ${
                          step.status === 'done'
                            ? 'text-zinc-600'
                            : 'text-zinc-300'
                        }`}
                      >
                        {step.name.replace(/ /g, '_')}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest ${
                        step.status === 'done'
                          ? 'text-emerald-900'
                          : step.status === 'running'
                          ? 'text-emerald-400 animate-pulse'
                          : 'text-zinc-800'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOGS */}
            <div className='bg-[#0a0a0a] border border-zinc-900'>
              <div className='p-3 px-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/20'>
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em] flex items-center gap-2'>
                  <TerminalIcon size={10} className='text-emerald-500' />{' '}
                  _Execution_Logs
                </h2>
                <div className='flex gap-1.5 opacity-30'>
                  <div className='w-1.5 h-1.5 rounded-full bg-zinc-700' />
                  <div className='w-1.5 h-1.5 rounded-full bg-zinc-700' />
                </div>
              </div>
              <div className='p-5 text-[10px] font-mono max-h-48 overflow-y-auto space-y-1.5'>
                {logs.map((log, i) => (
                  <div key={i} className='flex gap-3'>
                    <span className='text-zinc-800 shrink-0'>{'>'}</span>
                    <span className='text-zinc-500'>{log}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
                <div className='text-emerald-500/50 animate-pulse tracking-widest pt-2'>
                  _LISTENING_FOR_INPUT...
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR METRICS */}
          <div className='space-y-4'>
            {[
              {
                label: 'Total_Executions',
                value: agent.metrics?.runs || 0,
                icon: Activity
              },
              {
                label: 'Success_Probability',
                value: agent.metrics?.success || '0%',
                icon: Zap
              },
              {
                label: 'Network_Latency',
                value: agent.metrics?.latency || '0ms',
                icon: Clock
              }
            ].map((metric, idx) => (
              <div
                key={idx}
                className='bg-black border border-zinc-900 p-5 group transition-all hover:border-emerald-500/30'
              >
                <p className='text-[9px] text-zinc-700 uppercase tracking-widest mb-2 border-b border-zinc-900 pb-2'>
                  {metric.label}
                </p>
                <div className='flex justify-between items-end'>
                  <h3 className='text-3xl font-black text-white tracking-tighter uppercase'>
                    {metric.value}
                  </h3>
                  <metric.icon size={16} className='text-zinc-800 mb-1' />
                </div>
              </div>
            ))}

            {/* SYSTEM META - THE BOX AT THE BOTTOM OF YOUR SCREENSHOT */}
            <div className='p-5 border border-zinc-900 bg-zinc-900/5 text-[9px] text-zinc-700 uppercase tracking-[0.15em] space-y-4'>
              <div className='space-y-1'>
                <span className='block text-zinc-800 font-bold'>
                  Node_Identity
                </span>
                <span className='block text-zinc-500 truncate'>{agent.id}</span>
              </div>
              <div className='space-y-1'>
                <span className='block text-zinc-800 font-bold'>
                  Last_Sync_Uplink
                </span>
                <span className='block text-zinc-500 tracking-tighter'>
                  {agent.last_run || 'N/A'}
                </span>
              </div>
              <div className='pt-4 border-t border-zinc-900 text-emerald-500/30 font-black'>
                Synthetix_OS // Build_821.04
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}