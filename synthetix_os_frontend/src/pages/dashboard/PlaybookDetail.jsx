import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'

import AgentHero from '@/components/playbooks/AgentHero'
import CapabilitiesSection from '@/components/playbooks/CapabilitiesSection'
import IntegrationsSection from '@/components/playbooks/IntegrationsSection'
import ConfigurationSection from '@/components/playbooks/ConfigurationSection'
import ValidationErrors from '@/components/playbooks/ValidationErrors'
import DeploymentButton from '@/components/playbooks/DeploymentButton'
import { ChevronLeft } from 'lucide-react'
import usePlaybookDeployment from '@/hooks/usePlaybookDeployment'
import { useEffect } from 'react'
import { fetchBuiltInAgents } from '@/store/slices/agentsSlice'
import LoadingGateway from '@/components/ui/LoadingGateway'

export default function PlaybookDetail () {
  const { id } = useParams()
  const navigate = useNavigate()

  const builtInAgents = useSelector(state => state.agents.builtInItems)

  const agent = builtInAgents.find(a => a.id === id)
  const dispatch = useDispatch()
  const {
    formData,
    loading,
    validationErrors,
    handleFieldChange,
    handleCreateWorkflow
  } = usePlaybookDeployment(agent)

  useEffect(() => {
    dispatch(fetchBuiltInAgents())
  }, [dispatch])

  const agentsLoading = useSelector(state => state.agents.loading)

  console.log(agent)

  if (agentsLoading) {
    return (
      <>
        <LoadingGateway />
      </>
    )
  }

  if (!agent) {
    return (
      <>
        <LoadingGateway />
      </>
    )
  }

  const fields = agent?.input_schema || []

  return (
    <div className='flex bg-[#050505] min-h-screen'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Topbar />

        <main className='mx-auto w-full max-w-6xl space-y-8 p-8'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition'
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <AgentHero agent={agent} />

          <CapabilitiesSection capabilities={agent.capabilities} />

          <IntegrationsSection
            agent={agent}
            integrations={agent.required_integrations}
          />

          <ConfigurationSection
            fields={fields}
            formData={formData}
            validationErrors={validationErrors}
            onChange={handleFieldChange}
          />

          <ValidationErrors errors={validationErrors} />

          <DeploymentButton loading={loading} onClick={handleCreateWorkflow} />
        </main>
      </div>
    </div>
  )
}
