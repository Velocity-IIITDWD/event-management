import React from 'react'

import { Link } from 'react-router-dom'

function ManageCreds() {
  const CREDS = [
    {
      title: 'Velocity Event Registration',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ex fugiat veniam, non quo voluptate. Laudantium, maiores eos. Doloremque, perspiciatis? Ipsam laudantium laborum aliquid corporis vitae dolore autem eaque veniam..`,
      imgUrl: 'logo.svg',
      points: 50,
      id: Math.random(),
    },
    {
      title: 'Attendance',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sint praesentium error mollitia similique, dolor excepturi, voluptatem sequi nostrum debitis id saepe sapiente maxime voluptatum quod, beatae ipsum adipisci est.`,
      imgUrl: 'logo.svg',
      points: 10,
      id: Math.random(),
    },
  ]

  return (
    <>
      <div className='mt-10 px-20'>
        <Link to={'/admin/creds/new'} className='btn btn-accent btn-outline'>
          {' '}
          New Creds{' '}
        </Link>
      </div>
      <div className='px-5'>
        {CREDS.map(cred => (
          <div
            key={cred.id}
            className='card lg:card-side bg-base-100 drop-shadow-2xl w-full md:w-4/6 mx-auto my-5'
          >
            <div className='card-body'>
              <h2 className='card-title'>{cred.title}</h2>
              <p>{cred.description}</p>
              <span className='badge badge-ghost badge-sm text-lg p-5'>
                {cred.points} Points
              </span>
              <div className='card-actions justify-end mt-5'>
                <button className='btn btn-error btn-outline'>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ManageCreds
