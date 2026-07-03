import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import LoadingGateway from '@/components/ui/LoadingGateway'
import {
  ArrowLeft,
  ShieldAlert,
  Mail,
  UserRound,
  FileText,
  CheckCircle2,
  XCircle,
  Paperclip,
  Brain,
  Clock3
} from 'lucide-react'

import {
  fetchEmailExecutionDetail,
  manualReply,
  rejectHumanReview
} from '@/store/slices/emailAgentSlice'

export default function EmailExecutionDetail () {
  const { executionId } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const review = useSelector(state => state.emailAgent.executionDetail)

  const loading = useSelector(state => state.emailAgent.executionDetailLoading)

  const actionLoading = useSelector(
    state => state.emailAgent.reviewActionLoading
  )

  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody] = useState('')

  useEffect(() => {
    if (executionId) {
      dispatch(fetchEmailExecutionDetail(executionId))
    }
  }, [dispatch, executionId])

  useEffect(() => {
    if (review) {
      setReplySubject(review.reply_subject || '')
      setReplyBody(review.reply_body || '')
    }
  }, [review])

  const handleManualReply = async () => {
    await dispatch(
      manualReply({
        executionId,
        subject: replySubject,
        body: replyBody
      })
    )

    navigate(-1)
  }

  const handleReject = () => {
    dispatch(rejectHumanReview(executionId))
    navigate(-1)
  }

  if (loading || !review) {
    return <LoadingGateway />
  }

  console.log(review)

  return (
    <div className='flex min-h-screen bg-[#050505] text-zinc-300 font-mono'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='p-6 lg:p-10 space-y-8 max-w-5xl mx-auto w-full'>
          {/* HEADER */}
          <section className='border-b border-zinc-900 pb-6'>
            <button
              onClick={() => navigate(-1)}
              className='mb-5 flex items-center gap-2 text-zinc-500 hover:text-white transition-all'
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className='flex items-center justify-between gap-4 flex-wrap'>
              <div className='flex items-center gap-4 min-w-0'>
                <div className='p-3 bg-yellow-500/10 border border-yellow-500/20 shrink-0'>
                  <ShieldAlert className='text-yellow-400' size={22} />
                </div>
                <div className='min-w-0'>
                  <h1 className='text-2xl font-black text-white leading-tight'>
                    {review.result.replaceAll('_', ' ')}
                  </h1>
                  <p className='text-zinc-500 text-sm mt-1'>
                    {review.result === 'HUMAN_REVIEW'
                      ? 'AI escalated email requiring human decision'
                      : 'Processed email execution'}
                  </p>
                </div>
              </div>

              {review.result === 'HUMAN_REVIEW' && (
                <div className='flex items-center gap-3 shrink-0'>
                  <button
                    disabled={actionLoading}
                    onClick={handleReject}
                    className='flex items-center gap-2 px-4 py-2.5 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50 text-sm'
                  >
                    <XCircle size={16} />
                    Delete
                  </button>

                  <button
                    disabled={actionLoading}
                    onClick={() => {
                      handleManualReply()
                      navigate(-1)
                    }}
                    className='flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black hover:bg-emerald-400 transition-all disabled:opacity-50 text-sm font-semibold'
                  >
                    <CheckCircle2 size={16} />
                    Reply manually
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* META */}
          <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            {[
              {
                title: 'Sender',
                value: review.sender,
                icon: Mail
              },
              {
                title: 'Status',
                value: review.human_choice,
                icon: UserRound
              },
              {
                title: 'Attachments',
                value: review.attachments?.length || 0,
                icon: Paperclip
              },
              {
                title: 'Review Type',
                value: 'AI Escalation',
                icon: Brain
              }
            ].map(item => (
              <div
                key={item.title}
                className='bg-zinc-900/50 border border-zinc-800 p-5'
              >
                <div className='flex items-center justify-between mb-4'>
                  <item.icon className='text-emerald-500' size={18} />

                  <span className='text-[10px] uppercase text-zinc-600'>
                    metadata
                  </span>
                </div>

                <h3 className='text-sm text-white wrap-break-word font-semibold '>
                  {item.value}
                </h3>

                <p className='text-zinc-500 text-sm mt-2'>{item.title}</p>
              </div>
            ))}
          </section>

          {/* REASON */}
          <section className='bg-zinc-900/40 border border-zinc-800 p-6'>
            <div className='flex items-center gap-3 mb-5'>
              <Clock3 className='text-yellow-400' size={18} />

              <h2 className='text-xl font-bold text-white'>
                ESCALATION_REASON
              </h2>
            </div>

            <div className='text-zinc-300 leading-relaxed'>
              {review.reason || 'No reason provided'}
            </div>
          </section>

          {/* ORIGINAL EMAIL */}
          <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
            <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
              <Mail className='text-emerald-400' size={18} />

              <h2 className='text-xl font-bold text-white'>ORIGINAL_EMAIL</h2>
            </div>

            <div className='p-6'>
              <div className='bg-black/40 border border-zinc-800 p-5 whitespace-pre-wrap leading-relaxed text-zinc-300'>
                {review.email_body}
              </div>
            </div>
          </section>

          {/* AI GENERATED REPLY */}
          <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
            <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
              <Brain className='text-emerald-400' size={18} />

              <h2 className='text-xl font-bold text-white'>
                AI_GENERATED_REPLY
              </h2>
            </div>

            <div className='p-6 space-y-6'>
              <div>
                <div className='text-xs uppercase text-zinc-500 mb-2'>
                  Subject
                </div>

                <input
                  type='text'
                  value={replySubject}
                  onChange={e => setReplySubject(e.target.value)}
                  placeholder='No subject generated'
                  className='w-full bg-black/40 border border-zinc-800 p-4 text-white outline-none focus:border-emerald-500/50 transition-all'
                />
              </div>

              <div>
                <div className='text-xs uppercase text-zinc-500 mb-2'>
                  Reply Body
                </div>

                <textarea
                  value={replyBody}
                  onChange={e => setReplyBody(e.target.value)}
                  placeholder='No reply generated'
                  className='w-full min-h-62.5 bg-black/40 border border-zinc-800 p-5 whitespace-pre-wrap leading-relaxed text-zinc-300 outline-none focus:border-emerald-500/50 transition-all resize-y'
                />
              </div>
            </div>
          </section>

          {/* ATTACHMENTS */}
          <section className='bg-zinc-900/40 border border-zinc-800 overflow-hidden'>
            <div className='border-b border-zinc-800 p-6 flex items-center gap-3'>
              <Paperclip className='text-emerald-400' size={18} />

              <h2 className='text-xl font-bold text-white'>ATTACHMENTS</h2>
            </div>

            <div className='divide-y divide-zinc-800'>
              {review.attachments?.length === 0 ? (
                <div className='p-6 text-zinc-500'>
                  No attachments available
                </div>
              ) : (
                review.attachments?.map(file => (
                  <motion.a
                    key={file.id}
                    href={file.attachment}
                    target='_blank'
                    rel='noreferrer'
                    whileHover={{ x: 4 }}
                    className='flex items-center justify-between p-5 hover:bg-zinc-900 transition-all'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='p-3 bg-zinc-800'>
                        <FileText size={18} />
                      </div>

                      <div>
                        <div className='text-white text-sm font-medium'>
                          {file.filename || 'Attachment'}
                        </div>

                        <div className='text-zinc-500 text-xs mt-1'>
                          Click to preview/download
                        </div>
                      </div>
                    </div>

                    <ArrowLeft size={16} className='rotate-180 text-zinc-500' />
                  </motion.a>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
