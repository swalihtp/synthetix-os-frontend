import {
  FileText,
  Mail,
  FileSpreadsheet,
  CheckCircle2,
  Clock3,
  XCircle
} from 'lucide-react'

import { formatDistanceToNow } from 'date-fns'

const typeConfig = {
  resume: {
    label: 'Resume Analyzer',
    icon: FileText
  },
  meeting: {
    label: 'Meeting Summarizer',
    icon: FileSpreadsheet
  },
  email: {
    label: 'Email Automation',
    icon: Mail
  }
}

const statusConfig = {
  completed: {
    label: 'Completed',
    color: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
    icon: CheckCircle2
  },
  failed: {
    label: 'Failed',
    color: 'bg-red-500/10 text-red-300 border border-red-500/20',
    icon: XCircle
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
    icon: Clock3
  },
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
    icon: Clock3
  }
}

export default function ContinueWorkItem ({ item }) {
  const config =
    typeConfig[item.type] || {
      label: 'AI Task',
      icon: FileText
    }
  const status = statusConfig[item.status] || statusConfig.pending

  const Icon = config.icon
  const StatusIcon = status.icon

  return (
    <div className='group flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900'>
      <div className='flex items-center gap-4 min-w-0'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300'>
          <Icon size={20} />
        </div>

        <div className='min-w-0'>
          <h3 className='truncate font-medium text-white'>{item.title}</h3>

          <div className='mt-1 flex items-center gap-2 text-sm text-zinc-500'>
            <span>{config.label}</span>
            <span aria-hidden='true'>•</span>
            <span>
              {formatDistanceToNow(new Date(item.updated_at), {
                addSuffix: true
              })}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
      >
        <StatusIcon size={14} />
        {status.label}
      </div>
    </div>
  )
}
