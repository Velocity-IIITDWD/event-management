import React, { useState, useCallback, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import ManageCredComponent from './ManageCredComponent'

function ManageStudentCreds() {
  const registrationNumber = useLocation().pathname.split('/')[4]

  const [creds, setCreds] = useState([])

  const fetchCreds = useCallback(async () => {
    const response = await fetch(`/api/students/${registrationNumber}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await response.json()
    setCreds(data.student.creds.reverse())
  }, [registrationNumber, setCreds])

  useEffect(() => {
    fetchCreds()
  }, [fetchCreds])

  return (
    <div>
      <div className='mt-10 px-20'>
        <Link
          to={'/admin/students/managecreds/' + registrationNumber + '/new'}
          className='btn btn-accent btn-outline'
        >
          New Credit Points
        </Link>
      </div>

      {creds.map(creds => (
        <ManageCredComponent
          registrationNumber={registrationNumber}
          key={creds._id}
          creds={creds}
        />
      ))}
    </div>
  )
}

export default ManageStudentCreds
