import RestrictedRoute from '@/components/atoms/protected-route/restricted-route'
import loadable from '@loadable/component'
import { RouteObject } from 'react-router-dom'

const Login = loadable(() => import('@/pages/auth/login'))
const Register = loadable(() => import('@/pages/auth/register'))

const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <RestrictedRoute />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]

export default authRoutes
