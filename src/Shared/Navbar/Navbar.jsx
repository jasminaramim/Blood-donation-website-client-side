import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; 
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import useAuth from '../../Hoooks/useAuth';
import Container from '../Container';
import logo from '../../assets/images/images__2_-removebg-preview (1).png';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-[80px] z-20 shadow-lg transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white/100'}`}>
      <Container>
        <div className='flex items-center justify-between py-3 px-6'>
          {/* Logo and Title */}
          <div className='flex items-center'>
            <NavLink to='/'>
              <img src={logo} alt='logo' className='w-16 h-16 object-contain' />
            </NavLink>
            <p className='text-gray-800 font-bold text-xl md:text-2xl'>
              Blood <span className='text-red-500'>Donation</span>
            </p>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:flex gap-6 font-semibold text-lg'>
            <NavLink 
              to='/' 
              className={({ isActive }) => (isActive ? 'text-red-500' : 'hover:text-red-500 transition')}
            >
              Home
            </NavLink>
            <NavLink 
              to='/aboutUs' 
              className={({ isActive }) => (isActive ? 'text-red-500' : 'hover:text-red-500 transition')}
            >
              About
            </NavLink>
            <NavLink 
              to='/contactUs' 
              className={({ isActive }) => (isActive ? 'text-red-500' : 'hover:text-red-500 transition')}
            >
              Contact
            </NavLink>
            {user && (
              <>
                <NavLink 
                  to='/dashboard' 
                  className={({ isActive }) => (isActive ? 'text-red-500' : 'hover:text-red-500 transition')}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to='/signup' 
                  className={({ isActive }) => (isActive ? 'text-red-500' : 'hover:text-red-500 transition')}
                >
                  Donate
                </NavLink>
              </>
            )}
          </div>

          {/* User Profile and Dropdown */}
          <div className='relative'>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className='p-3 md:p-2 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
            >
              <AiOutlineMenu className='lg:hidden block' size={24} />
              <div className='hidden md:block'>
                {user?.photoURL ? (
                  <img
                    className='rounded-full w-10 h-10 object-cover'
                    referrerPolicy='no-referrer'
                    src={user.photoURL}
                    alt='profile'
                  />
                ) : (
                  <FaUserCircle size={30} className='text-gray-500' />
                )}
              </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className='absolute rounded-lg border border-gray-200 shadow-md w-[50vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm transition-all duration-200 ease-in-out'>
                <div className='flex flex-col cursor-pointer'>
                  {/* Profile Section (Only if user is logged in) */}
                  {user && (
                    <div className='px-4 py-3 flex items-center gap-3 border-b border-gray-200 bg-neutral-50'>
                      <img
                        className='rounded-full w-10 h-10 object-cover'
                        src={user.photoURL}
                        alt='Profile'
                        referrerPolicy='no-referrer'
                      />
                      <p className='font-semibold text-gray-700'>{user.displayName || "User"}</p>
                    </div>
                  )}

              

                  {user ? (
                    <>
                      <NavLink 
                        to='/dashboard/profile' 
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200'
                      >
                        Profile
                      </NavLink>
                      <NavLink 
                        to='/dashboard' 
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200'
                      >
                        Dashboard
                      </NavLink>
                      <NavLink 
                        to='/signup' 
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200'
                      >
                        Donate
                      </NavLink>
                      <div 
                        onClick={logOut} 
                        className='px-4 py-3 flex text-red-500 items-center gap-2 hover:bg-neutral-100 transition font-semibold cursor-pointer border-b border-gray-200'
                      >
                        Logout
                        <CiLogout size={20} className='text-red-500' />
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink 
                        to='/login' 
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200'
                      >
                        Login
                      </NavLink>
                      <NavLink 
                        to='/signup' 
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
