import { useEffect } from 'react'
import { RefreshCw, Users, UserCheck, Bot, Workflow } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import StatCard from './StatCard'
import { fetchDashboardStatistics } from '@/store/slices/adminDashboardStaticsSlice'

export default function SystemOverview () {
  const dispatch = useDispatch()

  const {
    users = {},
    agents = {},
    workflow_executions = {},
    loading,
    error
  } = useSelector(state => state.adminDashboard)

  const totalUsers = users.total ?? 0
  const activeUsers = users.active ?? 0
  const builtInAgents = agents.total ?? 0
  const workflows = workflow_executions.total ?? 0
  const runningExecs = workflow_executions.running ?? 0

  useEffect(() => {
    dispatch(fetchDashboardStatistics())
  }, [dispatch])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Failed to load dashboard statistics.</div>

  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5 mb-1'>
      <StatCard
        label='TOTAL USERS'
        value={totalUsers.toLocaleString()}
        badgeColor='text-emerald-400'
        barWidth='w-[75%]'
        barColor='bg-emerald-400'
        icon={Users}
      />

      <StatCard
        label='ACTIVE USERS'
        value={activeUsers.toLocaleString()}
        badgeColor='text-green-400'
        barWidth='w-[40%]'
        barColor='bg-green-400'
        icon={UserCheck}
      />

      <StatCard
        label='BUILT-IN AGENTS'
        value={builtInAgents}
        badgeColor='text-zinc-400'
        barWidth='w-[90%]'
        barColor='bg-blue-400'
        icon={Bot}
      />

      <StatCard
        label='WORKFLOW EXECUTIONS'
        value={workflows}
        badgeColor='text-zinc-400'
        barWidth='w-[65%]'
        barColor='bg-purple-400'
        icon={Workflow}
      />

      <StatCard
        label='RUNNING EXECS'
        value={runningExecs}
        icon={RefreshCw}
        iconClass='animate-spin'
        barWidth='w-[25%]'
        barColor='bg-orange-400'
        barAnimate
      />
    </section>
  )
}
