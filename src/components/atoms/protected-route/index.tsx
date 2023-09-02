import { RouteName } from '@/constants'
import useAuth from '@/hooks/useAuth'
import { setUser } from '@/redux/features/authSlice'
import { getProfile } from '@/services/membership.service'
import { getBalance } from '@/services/transaction.service'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoute() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      Promise.all([getProfile(), getBalance()]).then((res) => {
        dispatch(setUser({ ...res[0].data, balance: res[1].data.balance }))
      })
    }
  }, [token, dispatch])

  useEffect(() => {
    if (!token) {
      navigate(RouteName.LOGIN)
    }
  }, [token, navigate])

  return <Outlet />
}
