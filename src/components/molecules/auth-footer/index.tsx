import { Link } from 'react-router-dom'

export default function AuthFooter({
  text,
  link,
}: {
  text: string
  link: string
}) {
  return (
    <p>
      {text}{' '}
      <Link className="font-semibold text-primary" to={link}>
        di sini
      </Link>
    </p>
  )
}
