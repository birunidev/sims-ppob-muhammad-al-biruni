import { Loader } from '@/components/atoms'
import { ImageUploader, ReusableForm } from '@/components/molecules'
import DashboardTemplate from '@/components/templates/dashboard-template'
import useAuth from '@/hooks/useAuth'
import { setUser } from '@/redux/features/authSlice'
import {
  doLogout,
  updateProfile,
  updateProfileImage,
} from '@/services/membership.service'
import { getUserName } from '@/utils'
import { FormikValues } from 'formik'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineAtSymbol, HiOutlineUser } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'

export default function MyAccount() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [isDisabled, setIsDisabled] = useState(true)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const handleSave = async (values: FormikValues) => {
    const { first_name, last_name } = values

    try {
      const { data: userData } = await updateProfile({ first_name, last_name })

      dispatch(setUser({ ...user, ...userData }))

      // check if user update profile image
      if (uploadedImage) {
        const formData = new FormData()
        formData.append('file', uploadedImage)
        const { data: userImageData } = await updateProfileImage(formData)
        dispatch(setUser({ ...user, ...userImageData }))

        console.log(userImageData)
      }

      toast.success('Berhasil mengubah profil')

      setIsDisabled(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return <Loader />

  return (
    <DashboardTemplate hideBalance={true}>
      <div className="custom-container space-y-8 text-center md:max-w-[60%]">
        <div className="space-y-3">
          <ImageUploader
            disabled={isDisabled}
            getFile={(file: File) => setUploadedImage(file)}
          />
          <div>
            <h1 className="text-3xl font-bold">
              {getUserName(user?.first_name, user?.last_name)}
            </h1>
          </div>
        </div>
        <ReusableForm
          formCss="space-y-4"
          btnLabel="Simpan"
          isDisabled={isDisabled}
          handleSubmit={handleSave}
          fields={[
            {
              label: 'Email',
              name: 'email',
              type: 'text',
              placeholder: 'Masukkan email anda',
              icon: (
                <HiOutlineAtSymbol className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              ),
              id: 'email',
              initialValue: user.email,
              disabled: true,
            },
            {
              label: 'Nama Depan',
              name: 'first_name',
              type: 'text',
              placeholder: 'Masukkan nama lengkap',
              icon: (
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              ),
              id: 'first_name',
              initialValue: user.first_name,
              disabled: isDisabled,
            },
            {
              label: 'Nama Belakang',
              name: 'last_name',
              type: 'text',
              placeholder: 'Masukkan nama lengkap',
              icon: (
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              ),
              id: 'last_name',
              initialValue: user.last_name,
              disabled: isDisabled,
            },
          ]}
        />
        {isDisabled && (
          <div className="space-y-3">
            <button
              onClick={() => setIsDisabled(false)}
              className="btn btn-primary btn-md w-full capitalize text-white"
            >
              Edit Profil
            </button>
            <button
              onClick={() => doLogout()}
              className="btn btn-primary btn-outline btn-md w-full capitalize text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </DashboardTemplate>
  )
}
