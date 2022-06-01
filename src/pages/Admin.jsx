import React from 'react'

import { Link } from 'react-router-dom'

function Admin() {
  return (
    <>
      <div className='w-full'>
        <div className='my-10 px-10 flex mx-auto items-center justify-center'>
          <div className='card w-96 bg-base-100 shadow-xl mx-5'>
            <div className='card-body'>
              <h2 className='card-title'>Manage Events</h2>
              <p>Handle all the events</p>
              <Link to={'/admin/events'} className='card-actions justify-end'>
                <button className='btn btn-accent btn-outline'>Events</button>
              </Link>
            </div>
          </div>
          <div className='card w-96 bg-base-100 shadow-xl mx-5'>
            <div className='card-body'>
              <h2 className='card-title'>Manage Students</h2>
              <p>Handle all the students</p>
              <Link to={'/admin/students'} className='card-actions justify-end'>
                <button className='btn btn-accent btn-outline'>Students</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
