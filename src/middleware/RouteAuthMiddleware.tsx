import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

export default function RouteAuthMiddleware() {
  const { userNow } = useAuth();

	// if (!Boolean(userNow)) return (<Navigate to={`/auth/login?from=${window.location.href}`} replace />)
	if (!Boolean(userNow)) return (<Navigate to={`/?from=${window.location.href}`} replace />)
	return (<Outlet />)
}
