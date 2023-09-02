import { Logo } from '@/components/atoms'
import { RouteName } from '@/constants'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 w-full border-b border-gray-100">
      <div className="custom-container">
        <div className="navbar mx-0 bg-base-100 px-0">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex-none">
            <ul className="menu-horizontal space-x-3 px-1 md:space-x-12">
              <li>
                <NavLink
                  to={RouteName.TOP_UP}
                  className={({ isActive }) =>
                    `font-bold ${isActive ? 'text-primary' : 'text-gray-600'}`
                  }
                >
                  Top Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={RouteName.TRANSACTION}
                  className={({ isActive }) =>
                    `font-bold ${isActive ? 'text-primary' : 'text-gray-600'}`
                  }
                >
                  Transaction
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={RouteName.MY_ACCOUNT}
                  className={({ isActive }) =>
                    `font-bold ${isActive ? 'text-primary' : 'text-gray-600'}`
                  }
                >
                  Akun
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
