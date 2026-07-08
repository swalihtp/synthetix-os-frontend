import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'

import useDashboard from './hooks/useDashboard'

import DashboardHero from './components/DashboardHero'
import OverviewCards from './components/OverviewCards'
import ContinueWorking from './components/ContinueWorking'
import ApplicationsGrid from './components/ApplicationsGrid'
import WorkflowStatistics from './components/WorkflowStatistics'
import RecentActivity from './components/RecentActivity'
import QuickActions from './components/QuickActions'
import DashboardSkeleton from './components/DashboardSkeleton'

export default function Dashboard () {
  const { dashboard, loading, error, refresh } = useDashboard()

  if (loading && !dashboard && !error) {
    return <DashboardSkeleton />
  }

  const snapshot = dashboard ?? {}
  const overview = snapshot.overview ?? {}
  const activity = snapshot.today_activity ?? {}
  const continueWorking = snapshot.continue_working ?? []
  const applications = snapshot.applications ?? []
  const recentActivity = snapshot.recent_activity ?? []
  const workflowStatistics = snapshot.workflow_statistics ?? {
    completed: 0,
    running: 0,
    failed: 0
  }

  const errorMessage =
    error?.detail ||
    error?.message ||
    'We could not load the dashboard snapshot right now.'

  return (
    <>
      <div className='relative flex min-h-screen overflow-hidden bg-[#09090b] text-zinc-100 selection:bg-emerald-500 selection:text-black'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.09),_transparent_28%)]' />

        <Sidebar />

        <div className='relative z-10 flex min-w-0 flex-1 flex-col'>
          <Topbar />

          <main className='mx-auto w-full max-w-[1400px] flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
            {error && (
              <div className='flex items-start justify-between gap-4 rounded-[1.5rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-amber-50 backdrop-blur'>
                <div>
                  <h2 className='text-sm font-semibold'>
                    Dashboard refresh needed
                  </h2>
                  <p className='mt-1 text-sm text-amber-100/80'>
                    {errorMessage}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={refresh}
                  className='rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-50 transition hover:bg-amber-400/20'
                >
                  Retry
                </button>
              </div>
            )}

            <DashboardHero
              overview={overview}
              activity={activity}
              workflowStatistics={workflowStatistics}
            />

            <OverviewCards overview={overview} />

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='lg:col-span-2'>
                <ContinueWorking data={continueWorking} />
              </div>

              <div>
                <WorkflowStatistics data={workflowStatistics} />
              </div>
            </div>

            <ApplicationsGrid data={applications} />

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <RecentActivity data={recentActivity} />
              <QuickActions />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
