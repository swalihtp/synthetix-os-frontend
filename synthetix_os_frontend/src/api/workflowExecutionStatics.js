import API from "./auth"

export const getWorkflowExecutionStats = (days = 7) => {
  return API.get(`/system-admin/workflows/stats/?days=${days}`)
}

