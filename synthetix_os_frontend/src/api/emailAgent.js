// api/emailAgent.js

import API from './auth'

// GET SINGLE EMAIL AGENT
export function getEmailAgent (id) {
  return API.get(`/agent/${id}/`)
}

// GET EMAIL EXECUTIONS (ALL / FILTERED)
export function getEmailExecutions (agentId, page = 1, result = 'ALL') {
  return API.get(
    `/workflows/email-executions/?agent_id=${agentId}&page=${page}&result=${result}`
  )
}

// GET SINGLE EMAIL EXECUTION DETAIL
export function getEmailExecutionDetail(executionId) {
  return API.get(`/workflows/email-executions/${executionId}/`)
}

// APPROVE HUMAN REVIEW
export function approveHumanReviewApi (reviewId) {
  return API.post(`/workflows/email-executions/${reviewId}/manual-reply/`)
}

// DELETE EMAIL EXECUTION
export function rejectHumanReviewApi (reviewId) {
  return API.post(`/workflows/email-executions/${reviewId}/delete/`)
}

// GET DASHBOARD DATA
export function getEmailAgentDashboard (agentId) {
  return API.get(`/agent/${agentId}/dashboard/`)
}
export const manualReplyApi = (executionId, data) => {
  return API.post(
    `workflows/email-executions/${executionId}/manual-reply/`,
    data
  )
}