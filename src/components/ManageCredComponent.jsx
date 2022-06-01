import React from 'react'
import { Link } from 'react-router-dom'

function ManageCredComponent({ title, description, points, timestamp }) {
  return (
    <div className='card lg:card-side bg-base-100 drop-shadow-2xl w-full md:w-4/6 mx-auto my-5'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
        <span className='badge badge-ghost badge-sm text-lg p-5'>
          {points} Points
        </span>
        <div className='card-actions justify-end mt-2'>
          <Link
            to={
              '/admin/students/managecreds/:registrationNumber/edit/:timestamp'
            }
            className='btn btn-accent btn-outline'
          >
            Edit
          </Link>
          <button className='btn btn-error btn-outline'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ManageCredComponent
