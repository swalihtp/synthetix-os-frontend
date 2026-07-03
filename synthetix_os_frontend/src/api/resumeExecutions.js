import API from './auth'

export const getResumeExecutions = (params = {}) => {
  return API.get('/workflows/resume-executions/', { params })
}

export const getResumeExecutionDetail = id => {
  return API.get(`/workflows/resume-executions/${id}/`)
}

export const deleteResumeExecution = id => {
  return API.delete(`/workflows/resume-executions/${id}/`)
}

export const retryResumeExecution = id => {
  return API.post(`/workflows/resume-executions/retry/`,{execution_id:id})
}
