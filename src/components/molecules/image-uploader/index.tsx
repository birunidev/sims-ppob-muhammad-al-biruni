import { ProfilePicture } from '@/components/atoms'
import useAuth from '@/hooks/useAuth'
import useUploadImage from '@/hooks/useUploadImage'
import { generateProfilePicture } from '@/utils'
import { useEffect } from 'react'
import { HiPencil } from 'react-icons/hi2'

export default function ImageUploader({
  getFile,
  disabled = false,
}: {
  getFile: (file: File) => void
  disabled?: boolean
}) {
  const { user } = useAuth()
  const {
    imageUrl,
    imageFile,
    inputFileRef,
    setImageUrl,
    handleUploadImage,
    handleUploadImageClick,
  } = useUploadImage()

  useEffect(() => {
    if (user) setImageUrl(generateProfilePicture(user.profile_image))
  }, [user, setImageUrl])

  useEffect(() => {
    if (imageFile) {
      getFile(imageFile)
    }
  }, [imageFile, getFile])

  return (
    <div
      className="relative inline-block cursor-pointer"
      onClick={handleUploadImageClick}
    >
      <ProfilePicture size="2xl" imgUrl={imageUrl} />
      {disabled === false && (
        <>
          <input
            className="fixed left-[-100%] top-[-100%] z-[-1] opacity-0"
            type="file"
            onChange={handleUploadImage}
            ref={inputFileRef}
          />
          <button className="absolute bottom-0 right-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-200 bg-white text-center">
            <HiPencil />
          </button>
        </>
      )}
    </div>
  )
}
