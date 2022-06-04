import React, { useState, useCallback } from 'react'
import { Navigate } from 'react-router-dom'

function ManageCredComponent({ creds, registrationNumber }) {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = useCallback(async () => {
    const response = await fetch(
      `/.netlify/functions/app/students/creds/${registrationNumber}/${creds.key}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    const data = await response.json()

    if (response.status === 200) {
      setDeleted(true)
    } else {
      console.log(data)
      alert('something went wrong, check log / network tab')
      setDeleted(true)
    }
  }, [registrationNumber, creds.key])

  return (
    <div className='card lg:card-side bg-base-100 drop-shadow-2xl w-full md:w-4/6 mx-auto my-5'>
      {deleted && <Navigate to={'admin/students'} />}
      <div className='card-body'>
        <h2 className='card-title'>{creds.title}</h2>
        <p>{creds.description}</p>
        <span className='badge badge-ghost badge-sm text-lg p-5'>
          {creds.points} Points
        </span>
        <div className='card-actions justify-end mt-2'>
          <button className='btn btn-error btn-outline' onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageCredComponent
