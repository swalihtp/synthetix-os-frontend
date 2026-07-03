import API from './auth'

export const getBuiltInAgents = params => {
  return API.get('/system-admin/builtin-agents/', {
    params
  })
}