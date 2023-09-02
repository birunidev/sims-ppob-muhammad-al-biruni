import { Logo } from '@/components/atoms'
import ErrorTemplate from '@/components/templates/error-template'
import { RouteName } from '@/constants'
import { Link } from 'react-router-dom'

export default function NotFound404() {
  return (
    <ErrorTemplate>
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-2">
        <Logo />
        <div className="space-y-4">
          <div>
            <h1 className="text-[120px] font-bold">404</h1>
            <p>Are you get Lost ?</p>
          </div>

          <Link
            to={RouteName.DASHBOARD}
            className="btn btn-primary btn-outline capitalize"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </ErrorTemplate>
  )
}
