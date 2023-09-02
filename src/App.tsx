import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { protectedRoutes, authRoutes, publicRoutes } from './routes'
import './App.css'
import { useEffect } from 'react'
import { myLocalStorage, setAuthorizationHeader } from './utils'
import { LocalStorageKeys } from './constants'
import { useDispatch } from 'react-redux'
import { setToken } from './redux/features/authSlice'

const router = createBrowserRouter([
  ...protectedRoutes,
  ...authRoutes,
  ...publicRoutes,
])

const App = () => {
  const dispatch = useDispatch()
  const token = myLocalStorage.get(LocalStorageKeys.APP_TOKEN)
    ? JSON.parse(myLocalStorage.get(LocalStorageKeys.APP_TOKEN))
        .replace('"', '')
        .replace('"', '')
    : null

  useEffect(() => {
    if (token) {
      setAuthorizationHeader(token)
      dispatch(setToken(token))
    }
  }, [token, dispatch])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
