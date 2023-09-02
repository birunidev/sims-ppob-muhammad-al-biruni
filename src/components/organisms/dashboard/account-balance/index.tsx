import { LocalStorageKeys } from '@/constants'
import useAuth from '@/hooks/useAuth'
import { myLocalStorage } from '@/utils'
import { formatRupiah } from '@/utils/number'
import { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

export default function AccountBalance() {
  const { user } = useAuth()
  const [showBalance, setShowBalance] = useState<boolean>(
    JSON.parse(myLocalStorage.get(LocalStorageKeys.SHOW_BALANCE)) === 'true'
      ? true
      : false,
  )

  console.log(showBalance)

  const handleToggleBalance = () => {
    setShowBalance((prev) => {
      myLocalStorage.set(LocalStorageKeys.SHOW_BALANCE, JSON.stringify(!prev))
      return !prev
    })
  }

  return (
    <div className="relative space-y-2 rounded-lg bg-primary p-4 text-white md:w-1/2">
      <p className="font-normal">Saldo anda</p>
      <p className="text-3xl font-bold">
        {' '}
        Rp{' '}
        {showBalance ? (
          formatRupiah(user?.balance.toString() ?? '0')
        ) : (
          <span className="relative text-3xl">
            <>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</>
          </span>
        )}
      </p>
      <button
        className="relative z-[2] font-semibold"
        onClick={handleToggleBalance}
      >
        {showBalance ? 'Tutup' : 'Lihat'} Saldo{' '}
        {showBalance ? (
          <HiOutlineEyeSlash className="vertical-middle inline" />
        ) : (
          <HiOutlineEye className="vertical-middle inline" />
        )}
      </button>
      <svg
        className="absolute right-0 top-0 z-[0]"
        width="337"
        height="149"
        viewBox="0 0 337 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.3">
          <path
            d="M338.5 8.93432C308.333 -1.06568 235.585 -10.9473 206.5 41.9343C179 91.9341 177.5 129.934 105.5 154.934C47.9 174.934 36.1667 182.268 37.5 183.434"
            stroke="white"
          />
          <path
            d="M337.5 50.4341C319.667 41.9341 278.9 28.0342 244.5 42.4342C201.5 60.4342 208.5 87.9341 173 123.934C144.6 152.734 75.1667 162.267 44 163.434"
            stroke="white"
          />
          <path
            d="M338 65.4342C316.667 56.7675 266.5 45.9342 236.5 71.9342C199 104.434 211.5 134.434 137 152.934C77.4 167.734 21.5 185.767 1 192.934"
            stroke="white"
          />
          <path
            d="M348 101.934C333.833 95.1008 300.7 82.2341 281.5 85.4341C257.5 89.4341 251.982 89.2968 210.5 132.934C172 173.434 92.8333 176.267 54 175.434L256.5 192.934"
            stroke="white"
          />
        </g>
      </svg>
    </div>
  )
}
