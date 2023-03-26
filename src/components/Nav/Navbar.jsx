import { Link } from 'react-router-dom'

import { useContext, useEffect, useCallback, useState } from 'react'

import { authContext } from '../../store/authContext'

function Navbar() {
  const { isAuthenticated, type, registrationNumber } = useContext(authContext)

  const [name, setName] = useState('')

  const fetchData = useCallback(async () => {
    if (!registrationNumber) {
      return
    }

    const response = await fetch(
      '/.netlify/functions/app/public/student/' + registrationNumber
    )
    const data = await response.json()

    if (response.status === 200) {
      setName(data.student.name)
    }
  }, [registrationNumber])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <nav className='navbar bg-base-100 px-10'>
      <div className='flex-none'>
        <a href='https://velocityclub.live/' className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img
              src={process.env.PUBLIC_URL + '/logo.svg'}
              alt='Velocity Logo'
            />
          </div>
        </a>
      </div>
      <div className='flex-1'>
        <a
          href='https://velocityclub.live/'
          className={`btn btn-ghost normal-case text-xl ${
            type === 'admin' ? 'hidden md:inline-flex' : 'inline-flex'
          }`}
        >
          Velocity Events
        </a>
      </div>
      {isAuthenticated && type === 'admin' && (
        <Link to={'/admin'} className='btn btn-ghost normal-case text-xl'>
          Admin
        </Link>
      )}
      {isAuthenticated && (
        <Link to={'/timeline/' + registrationNumber} className='flex-none'>
          <div className='avatar placeholder'>
            <div className='bg-neutral-focus text-neutral-content rounded-full w-12 font-bold'>
              <span>{name.slice(0, 1)}</span>
            </div>
          </div>
        </Link>
      )}
    </nav>
  )
}

export default Navbar
