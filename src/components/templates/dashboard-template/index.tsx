import Navbar from '../partials/navbar'
import { WelcomeText, AccountBalance } from '@/components/organisms'

export default function DashboardTemplate({
  children,
  hideBalance = false,
}: {
  children?: React.ReactNode | React.ReactNode[]
  hideBalance?: boolean
}) {
  return (
    <>
      <Navbar />
      <div className="mt-12 space-y-6 md:space-y-12">
        {hideBalance == false && (
          <div className="custom-container justify-between space-y-8 md:flex md:space-y-0">
            <WelcomeText />
            <AccountBalance />
          </div>
        )}

        {children}
      </div>
    </>
  )
}
