import api from '@/config/api'

export const setAuthorizationHeader = (token: string | null) => {
  if (!token) delete api.defaults.headers.common['Authorization']
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const getUserName = (firstName?: string, lastName?: string) => {
  return `${firstName} ${lastName}`
}
