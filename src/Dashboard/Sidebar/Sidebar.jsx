import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import MenuItem from './Menu/MenuItems'
import useAuth from '../../Hoooks/useAuth'
import AdminMenu from './Menu/AdminMenu'
import VolentiarMenu from './Menu/VolentiarMenu'
import DonorMenu from './Menu/DonorMenu'
import logo from '../../../src/assets/images/logo.png'
import useRole from '../../Hoooks/useRole'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()


  const handleToggle = () => {
    setActive(!isActive)
  }

  console.log('Role:', role) 
  console.log('isActive:', isActive) 
  console.log('IsLoading:', isLoading) 
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                width="60"
                height="60"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
  className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-red-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
>

        <div>
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-red-100 mx-auto">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                width="70"
                height="70"
              />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Conditional Menu Rendering Based on Role */}
              {role?.role === 'donor' && <DonorMenu />}
              {role?.role === 'volunteer' && <VolentiarMenu />}
              {role?.role === 'admin' && <AdminMenu />}

            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
