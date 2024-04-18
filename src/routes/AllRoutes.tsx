// ** Middleware
import RoutePublicMiddleware from '../middleware/RoutePublicMiddleware'
import RouteAuthMiddleware from '../middleware/RouteAuthMiddleware'

// ** Public Pages
// import Default from '../pages/Default'
import Page404 from '../pages/404'

// ** Auth Pages
import LoginPage from '../pages/auth/LoginPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'

// ** Admin Pages
import AdminDashboard from '../pages/admin/Dashboard'

// ** Icon Imports
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import CategoryIcon from '@mui/icons-material/Category'

export interface IRoute {
  index?: boolean
  label?: string
  element?: JSX.Element
  path?: string
  icon?: JSX.Element | any
  children?: IRoute[]
  hideInNav?: boolean
}

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: '/',
    element: <RoutePublicMiddleware />,
    children: [{ index: true, path: '/', element: <LoginPage /> }]
  },
  {
    path: '/auth',
    element: <RoutePublicMiddleware />,
    children: [
      { index: true, path: '/auth/login', element: <LoginPage /> },
      { path: '/auth/forgot-password', element: <ForgotPasswordPage /> }
    ]
  }
]

const SETTING_ROUTES: IRoute[] = [
  {
    label: 'Setting',
    icon: <SettingsIcon />,
    children: [
      {
        path: '/admin/setting/category',
        label: 'Category',
        icon: <CategoryIcon />,
        element: <AdminDashboard />
      }
    ]
  }
]

export const MAIN_ROUTES: IRoute[] = [
  {
    path: '/admin',
    element: <RouteAuthMiddleware />,
    children: [
      {
        index: true,
        path: '/admin',
        label: 'Dashboard',
        icon: <DashboardIcon />,
        element: <AdminDashboard />
      },
      ...SETTING_ROUTES
    ]
  }
]

export const ADDITION_ROUTES: IRoute[] = [
  { path: '/404', element: <Page404 />, hideInNav: true },
  { path: '*', element: <Page404 />, hideInNav: true }
]

export const ALL_ROUTES: IRoute[] = [...PUBLIC_ROUTES, ...MAIN_ROUTES, ...ADDITION_ROUTES]
