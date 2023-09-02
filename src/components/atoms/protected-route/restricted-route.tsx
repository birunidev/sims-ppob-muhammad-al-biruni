import { RouteName } from '@/constants'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function RestrictedRoute() {
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      navigate(RouteName.DASHBOARD)
    }
  }, [token, navigate])

  return <Outlet />
}
