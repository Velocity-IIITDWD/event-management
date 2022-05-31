import { Link } from 'react-router-dom'

import { useContext } from 'react'

import { authContext } from '../../store/authContext'

function Navbar() {
  const { isAuthenticated } = useContext(authContext)

  return (
    <nav className='navbar bg-base-100 px-10'>
      <div className='flex-none'>
        <label className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img src='./logo.svg' alt='Velocity Logo' />
          </div>
        </label>
      </div>
      <div className='flex-1'>
        <Link to={'/'} className='btn btn-ghost normal-case text-xl'>
          Velocity Events
        </Link>
      </div>

      {isAuthenticated && (
        <div className='flex-none'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img
                src='https://api.lorem.space/image/face?hash=33791'
                alt='pfp'
              />
            </div>
          </label>
        </div>
      )}
    </nav>
  )
}

export default Navbar
