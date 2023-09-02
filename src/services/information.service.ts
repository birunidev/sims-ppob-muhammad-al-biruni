import api from '@/config/api'

export const getServices = async () => {
  return await api.get('/services')
}

export const getServiceByCode = async (code?: string) => {
  const response = await getServices()
  return response.data.find((service: any) => service.service_code === code)
}

export const getBanners = async () => {
  return await api.get('/banner')
}
