import { useAppSelector } from '.'

export default function useAuth() {
  const { isAuth, token, user } = useAppSelector((state) => state.auth)

  return {
    isAuth,
    token,
    user,
  }
}
