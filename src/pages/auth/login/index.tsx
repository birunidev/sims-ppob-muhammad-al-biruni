import { HiAtSymbol } from 'react-icons/hi2'
import { BiLock } from 'react-icons/bi'
import { Logo } from '@/components/atoms'
import { ReusableForm, AuthHeading, AuthFooter } from '@/components/molecules'
import { FormikValues } from 'formik'
import * as Yup from 'yup'
import { doLogin } from '@/services/membership.service'
import toast from 'react-hot-toast'
import { myLocalStorage, setAuthorizationHeader } from '@/utils'
import { LocalStorageKeys, RouteName } from '@/constants'
import { useDispatch } from 'react-redux'
import { setAuth, setToken } from '@/redux/features/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const handleLogin = async (values: FormikValues) => {
    try {
      const { email, password } = values
      const response: any = await doLogin({
        email,
        password,
      })
      console.log(response)
      setAuthorizationHeader(response.data.token)
      dispatch(setAuth(true))
      dispatch(setToken(response.data.token))
      myLocalStorage.set(LocalStorageKeys.APP_TOKEN, response.data.token)
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
          <AuthHeading text="Masuk atau buat akun untuk memulai" />
          <ReusableForm
            btnLabel="Masuk"
            handleSubmit={handleLogin}
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
                  .required('Email harus diisi')
                  .email('Format email tidak valid'),
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
                validation: Yup.string()
                  .required('Password harus diisi')
                  .min(8, 'Password minimal 8 karakter'),
                disabled: false,
              },
            ]}
          />
          <AuthFooter
            link={RouteName.REGISTER}
            text="Belum punya akun? Registrasi"
          />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img src="/assets/illustration/login.png" className="w-full" />
      </div>
    </div>
  )
}
