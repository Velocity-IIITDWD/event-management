import React, { useState } from 'react'

import { Link, Navigate } from 'react-router-dom'

function SearchedStudent({ student }) {
  const [password, setPassword] = useState('')
  const [name, setName] = useState(student.name)
  const [mobileNumber, setMobileNumber] = useState(student.mobileNumber)

  const [signupSuccess, setSignupSuccess] = useState(false)

  const updateHandler = async e => {
    e.preventDefault()

    if (name.length === 0 || mobileNumber.length === 0) {
      return
    }

    let updateData = {}

    if (password.length > 5) {
      updateData = {
        name,
        mobileNumber,
        password,
      }
    } else {
      updateData = {
        name,
        mobileNumber,
      }
    }

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updateData),
    }

    const response = await fetch(
      `/.netlify/functions/app/students/${student.registrationNumber}`,
      options
    )
    const data = await response.json()

    if (response.status >= 200 && response.status < 300) {
      setSignupSuccess(true)
    } else {
      console.log(data)
      alert('something went wrong , check log / network tab')
    }
  }

  const deleteHandler = async e => {
    const confirm = window.confirm(
      'Are you sure you want to delete this student?'
    )

    if (!confirm) return

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    const response = await fetch(
      `/.netlify/functions/app/students/${student.registrationNumber}`,
      options
    )
    const data = await response.json()

    if (response.status >= 200 && response.status < 300) {
      setSignupSuccess(true)
    } else {
      console.log(data)
      alert('something went wrong , check log / network tab')
    }
  }

  return (
    <div className='px-5'>
      {signupSuccess && <Navigate to='/admin' />}

      <form
        className='border border-base-200 p-10 my-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'
        onSubmit={updateHandler}
      >
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='name'
            required
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='phone'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Mobile Number
          </label>
          <input
            type='tel'
            id='phone'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='+91 --'
            required
            value={mobileNumber}
            onChange={e => {
              setMobileNumber(e.target.value)
            }}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value.trim())
            }}
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center block md:inline my-2 md:my-0'
        >
          Update
        </button>

        <Link
          to={'/admin/students/managecreds/' + student.registrationNumber}
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center block md:inline my-2 md:my-0'
        >
          Manage Creds
        </Link>
        <button
          className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  block md:inline  my-2 md:my-0'
          onClick={deleteHandler}
        >
          Delete
        </button>
      </form>
    </div>
  )
}
export default SearchedStudent
