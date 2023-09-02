import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/dashboard" className="flex items-center justify-center gap-2">
      <img className="w-[32px]" src="/assets/logo.svg" />
      <p className="text-sm font-bold md:text-base">SIMS PPOB</p>
    </Link>
  )
}
