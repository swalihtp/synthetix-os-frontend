import API from './auth'

// Get all agents
export const getAgents = () => {
  return API.get('/agent/')
}

// Get single agent
export const getAgent = id => {
  return API.get(`/agent/${id}/`)
}

// Create agent
export const createAgent = data => {
  return API.post('/agent/', data)
}

// Update agent
export const updateAgent = (id, data) => {
  return API.patch(`/agent/${id}/`, data)
}

// Delete agent
export const deleteAgent = id => {
  return API.delete(`/agent/${id}/`)
}

export const getBuiltInAgent = (searchOrParams = {}) => {
  const params =
    typeof searchOrParams === 'string'
      ? {
          search: searchOrParams
        }
      : searchOrParams || {}

  return API.get('/agent/builtin/', {
    params
  })
}

export const getBuiltInAgentDetail = id => {
  return API.get(`/agent/builtin/${id}/`)
}

// AI-powered workflow generation
export const generateWorkflow = data => {
  return API.post('/agent/generate/', data)
}

// Get agent templates
export const getAgentTemplates = () => {
  return API.get('/agent/templates/')
}
