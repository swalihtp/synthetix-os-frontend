import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthLoading } from '../store/slices/authSlice';
import LoadingGateway from '@/components/ui/LoadingGateway';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  // Keep showing the loader if authentication status is still being determined
  if (loading) {
    return <LoadingGateway />;
  }

  // If already authenticated, redirect straight to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;