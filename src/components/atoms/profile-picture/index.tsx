const sizeMapper = {
  sm: 'h-[32px] w-[32px]',
  md: 'h-[48px] w-[48px]',
  lg: 'h-[72px] w-[72px]',
  xl: 'h-[96px] w-[96px]',
  '2xl': 'h-[110px] w-[110px]',
}

export default function ProfilePicture({
  imgUrl,
  size = 'lg',
}: {
  imgUrl?: string
  size?: keyof typeof sizeMapper
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full border border-gray-100 ${sizeMapper[size]}`}
    >
      <img className="w-full" src={imgUrl} alt="Profile Picture" />
    </div>
  )
}
