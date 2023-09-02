import { isImage, isMax100KB } from '@/utils'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function useUploadImage(preview?: string) {
  const [imageUrl, setImageUrl] = useState(
    preview || '/assets/illustration/profile-picture.png',
  )
  const [imageFile, setImageFile] = useState<File | null>(null)

  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (!isImage(file)) {
      toast.error('File yang anda upload bukan gambar')
      return
    }

    if (!isMax100KB(file)) {
      toast.error('File yang anda upload melebihi 100KB')
      return
    }

    setImageUrl(URL.createObjectURL(file))
    setImageFile(file)
  }

  const handleUploadImageClick = () => {
    if (!inputFileRef.current) return
    inputFileRef.current.click()
  }

  return {
    imageUrl,
    imageFile,
    inputFileRef,
    setImageUrl,
    handleUploadImage,
    handleUploadImageClick,
  }
}
