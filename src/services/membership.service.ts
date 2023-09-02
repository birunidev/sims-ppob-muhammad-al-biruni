import api from '@/config/api'
import { LocalStorageKeys } from '@/constants'
import { store } from '@/redux'
import { setAuth, setToken, setUser } from '@/redux/features/authSlice'
import { LoginBody, ProfileBody, RegisterBody } from '@/types/membership'
import { myLocalStorage } from '@/utils'
import toast from 'react-hot-toast'

export const doLogin = async (data: LoginBody) => {
  return await api.post('/login', data)
}

export const doRegister = async (data: RegisterBody) => {
  return await api.post('/registration', data)
}

export const getProfile = async () => {
  return await api.get('/profile')
}

export const updateProfile = async (data: ProfileBody) => {
  return await api.put('/profile/update', data)
}

export const updateProfileImage = async (data: FormData) => {
  return await api.put('/profile/image', data)
}

export const doLogout = () => {
  myLocalStorage.remove(LocalStorageKeys.APP_TOKEN)
  store.dispatch(setAuth(false))
  store.dispatch(setUser(null))
  store.dispatch(setToken(null))
  toast.success('Berhasil Logout')
}
