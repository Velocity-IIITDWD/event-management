import { useCallback, useEffect, useState, useContext } from 'react'

import { authContext } from '../store/authContext'

import { useLocation, Navigate } from 'react-router-dom'

import TimelineComponent from '../components/TimelineComponent'

import { QRCodeSVG } from 'qrcode.react'

function Timeline() {
  const registrationNumber = useLocation().pathname.replace('/timeline/', '')
  const capsRegNumber = registrationNumber.toUpperCase()
  const { registrationNumber: loggedInRegNumber, logout } =
    useContext(authContext)

  const [loggedOut, setLoggedOut] = useState(false)

  const [student, setStudent] = useState(null)
  const [studentCreds, setStudentCreds] = useState(null)

  const fetchData = useCallback(async () => {
    const response = await fetch(
      '/.netlify/functions/app/public/student/' + registrationNumber
    )
    const data = await response.json()

    if (response.status === 200) {
      setStudent(data.student)
      setStudentCreds(data.student.creds.reverse())
    }
  }, [registrationNumber])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleLogout = useCallback(() => {
    logout()
    localStorage.clear()
    setLoggedOut(true)
  }, [logout])

  return (
    <div className='mt-10 px-10'>
      {loggedOut && <Navigate to={'/'} />}
      {student && (
        <>
          {loggedInRegNumber === registrationNumber && (
            <>
              <div className='flex justify-end flex-between items-center w-full mx-auto pb-5'>
                <div>
                  <button
                    type='button'
                    className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className='flex justify-center flex-between items-center w-full mx-auto pb-5'>
                <QRCodeSVG
                  value={capsRegNumber}
                  size={200}
                  imageSettings={{
                    src: 'logo.png',
                  }}
                  className='mx-10'
                />
              </div>
            </>
          )}
          <div className='stats shadow mt-5 mb-10 mx-auto w-full'>
            <div className='stat place-items-center'>
              <div className='stat-title'>Name</div>
              <div className='stat-value text-base md:text-xl'>
                {student.name}
              </div>
              <div className='stat-desc'>{student.registrationNumber}</div>
            </div>

            <div className='stat place-items-center'>
              <div className='stat-title'>Total Points</div>
              <div className='stat-value text-secondary'>
                {student.totalCreds}
              </div>
            </div>
          </div>

          <ol className='relative border-l border-gray-200 dark:border-gray-700'>
            {studentCreds.map(creds => {
              return (
                <TimelineComponent
                  key={creds.timestamp}
                  timestamp={
                    new Date(creds.timestamp).toDateString() +
                    ' : ' +
                    new Date(creds.timestamp).toLocaleTimeString()
                  }
                  points={creds.points}
                  heading={creds.title}
                  description={creds.description}
                />
              )
            })}
          </ol>
        </>
      )}
    </div>
  )
}

export default Timeline
