import { Link } from 'react-router-dom'

import { useContext } from 'react'

import { authContext } from '../../store/authContext'

function Navbar() {
  const { isAuthenticated, type } = useContext(authContext)
  const registrationNumber = '21bds069'

  return (
    <nav className='navbar bg-base-100 px-10'>
      <div className='flex-none'>
        <Link to={'/'} className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img src='./logo.png' alt='Velocity Logo' />
          </div>
        </Link>
      </div>
      <div className='flex-1'>
        <Link to={'/'} className='btn btn-ghost normal-case text-xl'>
          Velocity Events
        </Link>
      </div>
      {isAuthenticated && type === 'admin' && (
        <Link to={'/admin'} className='btn btn-ghost normal-case text-xl'>
          Admin
        </Link>
      )}
      {isAuthenticated && (
        <Link to={'/timeline/' + registrationNumber} className='flex-none'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img
                src='https://api.lorem.space/image/face?hash=33791'
                alt='pfp'
              />
            </div>
          </label>
        </Link>
      )}
    </nav>
  )
}

export default Navbar
