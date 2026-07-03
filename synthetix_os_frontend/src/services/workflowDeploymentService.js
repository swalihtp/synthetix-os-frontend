import API from '@/api/auth'
import { getGmailConnectUrl } from '@/api/integrations'

function buildPayload(agentId, configuration) {
  const payload = new FormData()

  payload.append('agent_id', agentId)

  payload.append(
    'configuration',
    JSON.stringify(configuration)
  )

  Object.entries(configuration).forEach(([key, value]) => {
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof File
    ) {
      value.forEach(file => {
        payload.append(key, file)
      })
    }
  })

  return payload
}

async function handleGmailIntegration(agent, configuration) {
  const statusRes = await API.get(
    '/integrations/status/'
  )

  const gmailConnected = statusRes.data.gmail

  if (gmailConnected) {
    return true
  }

  localStorage.setItem(
    'pendingWorkflow',
    JSON.stringify({
      agent_id: agent.id,
      configuration
    })
  )

  const res = await getGmailConnectUrl({
    agent_id: agent.id,
    configuration
  })

  window.location.href =
    res.data.authorization_url

  return false
}

export async function deployWorkflow({
  agent,
  configuration
}) {
  if (!agent) {
    throw new Error('Agent is required')
  }

  const integrations =
    agent.required_integrations || []

  // Handle integrations before deployment

  for (const integration of integrations) {
    switch (integration.name.toLowerCase()) {
      case 'gmail': {
        const canContinue =
          await handleGmailIntegration(
            agent,
            configuration
          )

        if (!canContinue) {
          return
        }

        break
      }

      default:
        break
    }
  }

  const payload = buildPayload(
    agent.id,
    configuration
  )

  return API.post(
    '/workflows/create-agent-and-workflow-from-template/',
    payload,
    {
      headers: {
        'Content-Type':
          'multipart/form-data'
      }
    }
  )
}