import { Bot, CheckCircle2, Workflow, Sparkles } from 'lucide-react'

import OverviewCard from './OverviewCard'

export default function OverviewCards ({ overview = {} }) {
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <OverviewCard
        title='Agents Active'
        value={overview.agents}
        subtitle='Custom AI assistants online'
        icon={Bot}
        accent='emerald'
      />

      <OverviewCard
        title='Built-in Agents'
        value={overview.built_in_agents}
        subtitle='Ready-made system agents'
        icon={Sparkles}
        accent='cyan'
      />

      <OverviewCard
        title='Workflows'
        value={overview.workflows}
        subtitle='Automation pipelines'
        icon={Workflow}
        accent='blue'
      />

      <OverviewCard
        title='Completed Today'
        value={overview.completed_today}
        subtitle='Successful executions today'
        icon={CheckCircle2}
        accent='emerald'
      />
    </section>
  )
}
