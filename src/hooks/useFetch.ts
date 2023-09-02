import { useState, useEffect } from 'react'
import useAuth from './useAuth'

const useFetch = (action: () => Promise<any>, isPrivate: boolean = true) => {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState<any>(null)

  async function loadData() {
    try {
      setLoading(true)
      const response = await action()
      setData(response.data)
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && isPrivate) loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isPrivate])

  return { data, loading, error }
}

export default useFetch
