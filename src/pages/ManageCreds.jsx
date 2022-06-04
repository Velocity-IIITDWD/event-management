import React, { useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

function ManageCreds() {
  const [creds, setCreds] = useState([])

  const fetchData = useCallback(async () => {
    const response = await fetch('/api/creds', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await response.json()

    if (response.status === 200) {
      setCreds(data.creds.reverse())
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteCred = async id => {
    const response = await fetch(`/api/creds/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    const data = await response.json()

    if (response.status === 200) {
      fetchData()
    } else {
      console.log(data)
      alert('something went wrong, check log / network tab')
    }
  }

  return (
    <>
      <div className='mt-10 px-20'>
        <Link to={'/admin/creds/new'} className='btn btn-accent btn-outline'>
          {' '}
          New Creds{' '}
        </Link>
      </div>
      <div className='px-5'>
        {creds.map(cred => (
          <div
            key={cred._id}
            className='card lg:card-side bg-base-100 drop-shadow-2xl w-full md:w-4/6 mx-auto my-5'
          >
            <div className='card-body'>
              <h2 className='card-title'>{cred.title}</h2>
              <p>{cred.description}</p>
              <span className='badge badge-ghost badge-sm text-lg p-5'>
                {cred.points} Points
              </span>
              <div className='card-actions justify-end mt-5'>
                <Link to={`/admin/creds/qrcode/${cred._id}`}>
                  <button className='btn btn-accent btn-outline'>
                    QR Code
                  </button>
                </Link>
                <button
                  className='btn btn-error btn-outline'
                  onClick={() => deleteCred(cred._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ManageCreds
