import API from "./auth"

export const getDashboardStatistics = () => {
  return API.get('/system-admin/dashboard/statistics/')
}