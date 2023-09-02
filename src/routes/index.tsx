import { RouteObject, useRouteError } from 'react-router-dom'
import authRoutes from './auth'
import protectedRoutes from './protected'
import { RouteName } from '@/constants'
import loadable from '@loadable/component'
import NotFound404 from '@/pages/errors/not-found'

const Home = loadable(() => import('@/pages/home'))

const ErrorBoundary = () => {
  const error: any = useRouteError()

  if (error.status === 404) {
    return <NotFound404 />
  }

  return <div></div>
}

const publicRoutes: RouteObject[] = [
  {
    path: RouteName.HOME,
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
]

export { protectedRoutes, authRoutes, publicRoutes }
