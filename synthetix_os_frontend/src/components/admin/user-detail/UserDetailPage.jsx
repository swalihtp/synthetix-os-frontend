import {
  ArrowLeft,
  Mail,
  Shield,
  Clock,
  Calendar,
  Bot,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import InfoItem from './InfoItem'
import UserActions from './UserAction'
import { useNavigate } from 'react-router-dom'
import API from '@/api/auth'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingGateway from '@/components/ui/LoadingGateway'

const statIcons = {
  'Agent Used': Bot,
  'Workflow Execution': Activity,
  'Success Rate': CheckCircle2
}

let s = "hlowork"

s.tol

const activities = [
  {
    title: 'Created AI workflow',
    description: 'Customer support automation',
    time: '2 hours ago'
  },
  {
    title: 'Updated profile permissions',
    description: 'Changed role to Administrator',
    time: 'Yesterday'
  },
  {
    title: 'Connected new integration',
    description: 'Slack workspace connected',
    time: '3 days ago'
  }
]

export default function UserDetail () {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`system-admin/users/${id}/`)

        setUser(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [id])


  if (!user) {
    return (
      <>
        <LoadingGateway />
      </>
    )
  }
  

  

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100'>
      <div className='mx-auto max-w-7xl space-y-6 p-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button className='flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700 hover:bg-zinc-800' onClick={()=>navigate(-1)}>
              <ArrowLeft className='h-4 w-4 text-zinc-400'  />
            </button>
            <div>
              <h1 className='text-2xl font-semibold tracking-tight'>
                User Details
              </h1>

              <p className='mt-1 text-sm text-zinc-500'>
                Monitor user activity and account information
              </p>
            </div>
          </div>

          <UserActions
            user={user}
          />
        </div>

        {/* Top Section */}
        <div className='grid gap-6 lg:grid-cols-[320px_1fr]'>
          {/* Profile Card */}
          <div className='rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm'>
            <div className='flex flex-col items-center text-center'>
              <div className='flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-800 text-3xl font-semibold'>
                {user.email?.slice(0, 2).toUpperCase() || 'NA'}{' '}
              </div>

              <h2 className='mt-4 text-xl font-semibold'>
                {user.fullname || 'No Name'}
              </h2>

              <div className='mt-2 flex items-center gap-2 text-zinc-400'>
                <Mail className='h-4 w-4' />
                <span className='text-sm'>{user.email}</span>
              </div>

              <div className='mt-6 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1'>
                <span className='h-2 w-2 rounded-full bg-emerald-400' />
                <span className='text-sm text-emerald-400'>{user.status}</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className='rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm'>
            <h3 className='mb-6 text-lg font-medium text-zinc-200'>
              Account Overview
            </h3>

            <div className='grid gap-6 md:grid-cols-2'>
              <InfoItem
                icon={Shield}
                label='Role'
                value={user.role_name || 'No Role'}
              />

              <InfoItem
                icon={Calendar}
                label='Joined'
                value={new Date(user.created_at).toLocaleDateString()}
              />
              <InfoItem icon={Clock} label='Last Login' value= {new Date(user.last_login).toLocaleDateString()} />


              <InfoItem
                icon={CheckCircle2}
                label='Verified'
                value={user.is_verified ? 'Verified' : 'Unverified'}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className='grid gap-6 md:grid-cols-3'>
          {user.stats.map(({ label, value, icon: Icon }) => {
            Icon = statIcons[label] || Activity

            return (
              <div
                key={label}
                className='rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm'
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-sm text-zinc-500'>{label}</p>

                    <h3 className='mt-3 text-3xl font-semibold'>{value}</h3>
                  </div>

                  <div className='rounded-2xl border border-zinc-800 bg-zinc-900 p-3'>
                    <Icon className='h-5 w-5 text-zinc-400' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Activity Timeline */}
        <div className='rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm'>
          <h3 className='mb-6 text-lg font-medium text-zinc-200'>
            Recent Activity
          </h3>

          <div className='space-y-6'>
            {user.activities.map(activity => (
              <div key={activity.title} className='flex gap-4'>
                <div className='mt-1 h-3 w-3 rounded-full bg-cyan-500' />

                <div className='flex-1 border-b border-zinc-800 pb-6 last:border-none last:pb-0'>
                  <div className='flex items-center justify-between'>
                    <h4 className='font-medium text-zinc-200'>
                      {activity.id}
                    </h4>

                    <span className='text-xs text-zinc-500'>
                      {activity.time}
                    </span>
                  </div>

                  <p className='mt-2 text-sm text-zinc-500'>
                    workflow id {activity.id} started at {new Date(activity.started_at).toLocaleTimeString()} and ended at{new Date(activity.ended_at).toLocaleTimeString()} with status {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
