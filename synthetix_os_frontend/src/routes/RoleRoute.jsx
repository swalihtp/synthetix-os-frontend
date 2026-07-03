import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  selectUser,
  selectAuthLoading,
  selectIsAuthenticated
} from '@/store/slices/authSlice'

import LoadingGateway from '@/components/ui/LoadingGateway'

const RoleRoute = ({ allowedRoles, children }) => {
  const user = useSelector(selectUser)
  const loading = useSelector(selectAuthLoading)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (loading || (isAuthenticated && !user)) {
    return <LoadingGateway />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const hasAccess = allowedRoles.includes(user.role)

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default RoleRoute