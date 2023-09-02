import useFetch from './useFetch'
import { getBanners, getServices } from '@/services/information.service'

export default function useDashboard() {
  const { data: services, loading: serviceLoading } = useFetch(getServices)
  const { data: banners, loading: bannerLoading } = useFetch(getBanners)

  return {
    services,
    serviceLoading,
    banners,
    bannerLoading,
  }
}
