import { Global } from '@/constants'
import myLocalStorage from './local-storage'

export const generateProfilePicture = (imgUrl: string | undefined) => {
  if (!imgUrl) return Global.DEFAULT_IMAGE
  return imgUrl.includes('null') == false ? imgUrl : Global.DEFAULT_IMAGE
}
export const getRealMonth = (data: string) => {
  const date = new Date(data)
  return date.getMonth() + 1
}

export const formatDate = (data: string) => {
  const date = new Date(data)

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours() // Adjust for WIB (West Indonesia Time, UTC+7)
  const minutes = date.getMinutes()

  const formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`
  return formattedDate
}

export * from './array'
export * from './auth'
export * from './number'
export * from './file'

export { myLocalStorage }
