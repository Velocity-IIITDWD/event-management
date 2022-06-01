import React from 'react'

import { Link } from 'react-router-dom'

function SearchedStudent() {
  return (
    <div className='px-5'>
      <form className='border border-base-200 p-10 my-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'>
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
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='reg'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Registration Number
          </label>
          <input
            type='text'
            id='reg'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='eg. 21bds069'
            required
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
            required
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='confirmpassword'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmpassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='password'
            required
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Update
        </button>

        <Link
          to='/admin/students/managecreds/:registrationNumber'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5'
        >
          Manage Creds
        </Link>
        <button className='text-white bg-red-500  ml-5 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
          Delete
        </button>
      </form>
    </div>
  )
}
export default SearchedStudent
