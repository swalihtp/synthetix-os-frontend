import SystemOverview from './SystemOverview'
import ExecutionMatrix from './ExecutionMatrix'
import AIUsageDashboardPanel from './AIUsageDashboardPanel'
import ActivityStream from './ActivityStream'
import UserRegistry from './UserRegistry'

export default function Dashboard () {
  return (
    <div className='p-margin flex flex-col gap-stack-lg flex-1'>
      {/* Row 1: stat cards */}
      <SystemOverview />

      {/* Row 2: execution matrix + health panel */}
      <section className='grid grid-cols-1 lg:grid-cols-12 gap-stack-lg m-0.5'>
        <ExecutionMatrix />
        <AIUsageDashboardPanel />
      </section>

      {/* Row 3: activity stream + user registry */}
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-stack-lg mt-0.5 items-stretch auto-rows-fr'>
        <ActivityStream />
        <UserRegistry />
      </section>
    </div>
  )
}
