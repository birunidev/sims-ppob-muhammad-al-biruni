import Navbar from '@/components/templates/partials/navbar'
import { RouteName } from '@/constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(RouteName.DASHBOARD)
  }, [navigate])

  return (
    <div>
      <Navbar />
      <div></div>
    </div>
  )
}
