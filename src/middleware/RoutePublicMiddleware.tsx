import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

export default function RoutePublicMiddleware() {
  const { userNow } = useAuth();
	const [params] = useSearchParams();

	if (Boolean(userNow)) return (
		<Navigate to={params.get("from")?String(params.get("from")).replace(window.location.origin, ""):"/admin"} replace />
	)
	return (<Outlet />)
}
