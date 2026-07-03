import API from './auth'

export const createMeetingNotesExecution = formData => {
  return API.post('/workflows/meeting-notes-executions/analyze/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getMeetingSummaryExecutions = (params = {}) => {
  return API.get('/workflows/meeting-summary-executions/', { params })
}

export const getMeetingSummaryExecutionDetail = id => {
  return API.get(`/workflows/meeting-summary-executions/${id}/`)
}

export const deleteMeetingSummaryExecution = id => {
  return API.delete(`/workflows/meeting-summary-executions/${id}/`)
}

export const retryMeetingSummaryExecution = id => {
  return API.post(`/workflows/meeting-summary-executions/retry/`, {execution_id:id})
}
