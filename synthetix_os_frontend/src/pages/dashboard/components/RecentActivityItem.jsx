import {
  FileText,
  Mail,
  FileSpreadsheet,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronRight
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const typeConfig = {
  resume: {
    label: 'Resume Analyzer',
    action: 'Resume processed',
    icon: FileText
  },
  meeting: {
    label: 'Meeting Summarizer',
    action: 'Meeting summarized',
    icon: FileSpreadsheet
  },
  email: {
    label: 'Email Automation',
    action: 'Email processed',
    icon: Mail
  }
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: 'text-emerald-300',
    badge: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
  },
  failed: {
    icon: XCircle,
    color: 'text-red-300',
    badge: 'bg-red-500/10 border border-red-500/20 text-red-300'
  },
  processing: {
    icon: Clock3,
    color: 'text-blue-300',
    badge: 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
  },
  pending: {
    icon: Clock3,
    color: 'text-amber-300',
    badge: 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
  }
}

export default function RecentActivityItem ({ activity }) {
  const type =
    typeConfig[activity.type] || {
      label: 'AI Task',
      action: 'Activity recorded',
      icon: FileText
    }
  const status = statusConfig[activity.status] || statusConfig.pending

  const TypeIcon = type.icon
  const StatusIcon = status.icon

  return (
    <div className='group relative pl-10'>
      <div className='absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-500 bg-zinc-950'>
        <div className='h-2 w-2 rounded-full bg-emerald-400' />
      </div>

      <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-3'>
              <div className={`rounded-full p-2 ${status.color}`}>
                <TypeIcon size={16} />
              </div>
              <div>
                <h3 className='font-medium text-white'>{type.action}</h3>
                <p className='mt-1 break-all text-sm text-zinc-400'>
                  {activity.title}
                </p>
              </div>
            </div>

            <div className='mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500'>
              <span>{type.label}</span>
              <span aria-hidden='true'>•</span>
              <span>
                {formatDistanceToNow(new Date(activity.timestamp), {
                  addSuffix: true
                })}
              </span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${status.badge}`}
            >
              <StatusIcon size={14} />
              {activity.status}
            </span>

            <ChevronRight
              size={18}
              className='text-zinc-600 transition group-hover:text-white'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
