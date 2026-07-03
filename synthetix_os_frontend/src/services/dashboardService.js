import API from "@/api/auth"

const dashboardService = {
  getDashboard: async () => {
    const response = await API.get('/dashboard')
    return response.data
  }
}

export default dashboardService