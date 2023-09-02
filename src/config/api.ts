import { Env } from '@/constants'
import { doLogout } from '@/services/membership.service'
import axios, { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: Env.API_BASE_URL,
})

const errorHandler = (error: AxiosError) => {
  if (error && error.response) {
    let message: string = ''

    const originalRequest: any = error.config
    const { status, data } = error.response as AxiosResponse
    if (status === 500) message = 'Something went terribly wrong'

    if (status === 403 && originalRequest._retry === false) {
      message = 'Forbidden Access'
    }

    if (status === 401) {
      message = 'You must log in first'
      doLogout()
      // do something for the unauthenticated user
    } else message = data.message

    if (typeof message === 'string') toast.error(message)

    return Promise.reject(error)
  }
}

api.interceptors.response.use(
  (response) => response.data,
  (error) => errorHandler(error),
)

export default api
