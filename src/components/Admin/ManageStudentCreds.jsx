import React from 'react'

import { Link } from 'react-router-dom'

import ManageCredComponent from './ManageCredComponent'

function ManageStudentCreds() {
  return (
    <div>
      <div className='mt-10 px-20'>
        <Link
          to={'/admin/students/managecreds/:registrationNumber/new'}
          className='btn btn-accent btn-outline'
        >
          New Credit Points
        </Link>
      </div>

      <ManageCredComponent
        title={'Signup Bonus'}
        description='Received Signup bonus'
        points={50}
      />
    </div>
  )
}

export default ManageStudentCreds
