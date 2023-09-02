import { ProfilePicture } from '@/components/atoms'
import useAuth from '@/hooks/useAuth'
import { generateProfilePicture } from '@/utils'

export default function WelcomeText() {
  const { user } = useAuth()
  return (
    <div className=" space-y-3">
      <ProfilePicture imgUrl={generateProfilePicture(user?.profile_image)} />
      <div className="space-y-1">
        <p>Selamat datang,</p>
        {user && (
          <h1 className="text-2xl font-semibold">
            {user?.first_name} {user?.last_name}
          </h1>
        )}
      </div>
    </div>
  )
}
