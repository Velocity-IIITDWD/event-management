import { Link, useLocation } from 'react-router-dom'

import { useContext } from 'react'

import { authContext } from '../../store/authContext'

function Navbar() {
  const { isAuthenticated } = useContext(authContext)

  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className='navbar bg-base-100 md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-3 drop-shadow-md'>
      <div className='navbar-start'>
        <label className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img src='logo.svg' alt='velocity logo' />
          </div>
        </label>
      </div>
      <div className='navbar-center'>
        <Link to={'/'} className='btn btn-ghost normal-case text-xl'>
          Velocity Events
        </Link>
      </div>
      <div className='navbar-end '>
        {!isAuthenticated && !isLoginPage && (
          <Link to={'/login'} className='btn text-sm'>
            Login
          </Link>
        )}
        {isAuthenticated && (
          <div className='bg-neutral-focus text-neutral-content rounded-full w-24'>
            <span className='text-3xl'>P</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
