import loadable from '@loadable/component'
import { RouteObject } from 'react-router-dom'

const ProtectedRoute = loadable(
  () => import('@/components/atoms/protected-route'),
)
const Dashboard = loadable(() => import('@/pages/protected/dashboard'))
const TopUp = loadable(() => import('@/pages/protected/top-up'))
const Transaction = loadable(() => import('@/pages/protected/transaction'))
const MyAccount = loadable(() => import('@/pages/protected/my-account'))
const Payment = loadable(() => import('@/pages/protected/payment'))

const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'top-up',
        element: <TopUp />,
      },
      {
        path: 'transaction',
        element: <Transaction />,
      },
      {
        path: 'my-account',
        element: <MyAccount />,
      },
      {
        path: 'payment/:service_code',
        element: <Payment />,
      },
    ],
  },
]

export default protectedRoutes
