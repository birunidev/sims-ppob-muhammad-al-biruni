import { HiAtSymbol } from 'react-icons/hi2'
import { BiLock, BiUser } from 'react-icons/bi'
import { Logo } from '@/components/atoms'
import { ReusableForm, AuthHeading, AuthFooter } from '@/components/molecules'
import { FormikValues } from 'formik'
import * as Yup from 'yup'
import { doRegister } from '@/services/membership.service'
import { RouteName } from '@/constants'
import toast from 'react-hot-toast'

export default function Register() {
  const handleRegister = async (values: FormikValues) => {
    try {
      const { email, first_name, last_name, password } = values

      const response: any = await doRegister({
        email,
        first_name,
        last_name,
        password,
      })
      toast.success(response.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex h-[100vh] items-center justify-center lg:overflow-hidden">
      <div className="custom-container space-y-3 text-center lg:w-1/2 lg:max-w-md">
        <Logo />
        <div className="space-y-6">
          <AuthHeading text="Lengkapi data untuk membuat akun" />
          <ReusableForm
            handleSubmit={handleRegister}
            btnLabel="Registrasi"
            fields={[
              {
                type: 'text',
                name: 'email',
                placeholder: 'masukkan email anda',
                id: 'email',
                icon: (
                  <HiAtSymbol className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                ),
                initialValue: '',
                validation: Yup.string()
                  .required('Email wajib diisi')
                  .email('Format email tidak valid'),
                disabled: false,
              },
              {
                type: 'text',
                name: 'first_name',
                placeholder: 'masukkan nama depan anda',
                id: 'first_name',
                icon: (
                  <BiUser className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                ),
                initialValue: '',
                validation: Yup.string()
                  .required('Nama depan wajib diisi')
                  .max(100, 'Nama depan maksimal 100 karakter')
                  .min(3, 'Nama depan minimal 3 karakter'),
                disabled: false,
              },
              {
                type: 'text',
                name: 'last_name',
                placeholder: 'masukkan nama belakang anda',
                id: 'last_name',
                icon: (
                  <BiUser className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                ),
                initialValue: '',
                validation: Yup.string()
                  .required('Nama belakang wajib diisi')
                  .max(100, 'Nama belakang maksimal 100 karakter')
                  .min(3, 'Nama belakang minimal 3 karakter'),
                disabled: false,
              },
              {
                type: 'password',
                name: 'password',
                placeholder: 'masukkan password anda',
                id: 'password',
                icon: (
                  <BiLock className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                ),
                initialValue: '',
                validation: Yup.string().min(8, 'Password minimal 8 karakter'),
                disabled: false,
              },
              {
                type: 'password',
                name: 'password_confirmation',
                placeholder: 'masukkan password anda',
                id: 'password_confirmation',
                icon: (
                  <BiLock className="absolute left-[10px] top-[50%] h-4 w-4 translate-y-[-50%]" />
                ),
                initialValue: '',
                validation: Yup.string()
                  .required()
                  .oneOf([Yup.ref('password')], 'Password tidak sama'),
                disabled: false,
              },
            ]}
          />
          <AuthFooter link={RouteName.LOGIN} text="Sudah punya akun? Login" />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img src="/assets/illustration/login.png" className="w-full" />
      </div>
    </div>
  )
}
