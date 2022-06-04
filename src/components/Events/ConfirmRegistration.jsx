import React, { useContext, useState, useCallback, useEffect } from 'react'

import { authContext } from '../../store/authContext'

import { Link, useLocation, Navigate } from 'react-router-dom'

function ConfirmRegistration() {
  const { isAuthenticated, studentId } = useContext(authContext)

  const eventId = useLocation().pathname.split('/')[2]

  const [event, setEvent] = useState({})
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const fetchData = useCallback(async () => {
    const response = await fetch(
      '/.netlify/functions/app/public/events/' + eventId
    )
    const data = await response.json()

    if (response.status === 200) {
      if (data.event.registrations.indexOf(studentId) !== -1) {
        setRegistrationSuccess(true)
      }

      setEvent(data.event)
    }
  }, [eventId, studentId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const register = async e => {
    const response = await fetch(
      '/.netlify/functions/app/registrations/' + eventId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    if (response.status > 200 && response.status < 300) {
      // console.log(data)
      alert('Registration successful!')
      setRegistrationSuccess(true)
    } else {
      alert('Registration failed!')
    }
  }

  return (
    <div className='my-10 px-10 w-full '>
      {registrationSuccess && <Navigate to={'/'} />}
      <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto p-10'>
        <div className='flex flex-col items-center pb-10 mt-10'>
          {isAuthenticated ? (
            <>
              <img
                className='mb-3 w-24 h-24 rounded-full shadow-lg'
                src={event.imgUrl}
                alt='Event Cover'
              />
              <h5 className='mb-1 text-xl font-medium text-gray-900'>
                {event.title}
              </h5>
              <span className='text-sm text-gray-500 '>
                {event.description}
              </span>
              <div className='flex mt-4 space-x-3 lg:mt-6'>
                <button
                  className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                  onClick={register}
                >
                  Confirm
                </button>
                <Link
                  to={'/'}
                  className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200'
                >
                  Cancel
                </Link>
              </div>
            </>
          ) : (
            <div>
              Login to continue.. or if you are already logged in then try to
              relogin{' '}
              <Link to={'/login'} className='text-blue-600'>
                here
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfirmRegistration
