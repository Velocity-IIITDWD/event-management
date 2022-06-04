import React, { useState, useCallback, useContext, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { authContext } from '../store/authContext'

function CredRewards() {
  const credId = useLocation().pathname.split('/')[2]

  const [creds, setCreds] = useState(null)
  const [isInvalid, setIsInvalid] = useState(true)

  const { registrationNumber } = useContext(authContext)

  const fetchData = useCallback(async () => {
    const response = await fetch('/api/qrcodes/' + credId, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const data = await response.json()

    if (response.status === 200) {
      setCreds(data.creds)
      setIsInvalid(false)
    }
  }, [credId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='w-full px-10 mt-10'>
      <div className='p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md  mx-auto'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {!isInvalid && <span>Yayy!! &#127881;&#127881;</span>}
          {isInvalid && <span>Oops!</span>}
        </h5>

        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {!isInvalid && (
            <span>
              You got {creds.points} points for {creds.description}
            </span>
          )}
          {isInvalid && (
            <span>
              Something went wrong. Make sure you are logged in or else the code
              is expired
            </span>
          )}
        </p>
        <Link
          to={'/timeline/' + registrationNumber}
          className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Check Timeline
          <svg
            className='ml-2 -mr-1 w-4 h-4'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default CredRewards
