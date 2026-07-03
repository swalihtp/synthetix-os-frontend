import API from "./auth"

export const getAIUsageDashboard = () =>
  API.get('/system-admin/ai-usage/dashboard/')