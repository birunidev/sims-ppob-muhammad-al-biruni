import { ReactNode } from 'react'
import Navbar from '../partials/navbar'

export default function ErrorTemplate({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <div className="text-center">
      <Navbar />
      {children}
    </div>
  )
}
