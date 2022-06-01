import React from 'react'

import SearchedStudent from '../components/SearchedStudent'

function ManageStudents() {
  return (
    <div className='px-10 my-10'>
      <form>
        <label
          for='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only'
        >
          Your Email
        </label>
        <div className='relative'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 '
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='search'
            className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-300 focus:border-gray-300'
            placeholder='Search Registration Number'
            required=''
            autoComplete='off'
          />
          <button
            type='submit'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-4 py-2 '
          >
            Search
          </button>
        </div>
      </form>
      <SearchedStudent />
    </div>
  )
}

export default ManageStudents
