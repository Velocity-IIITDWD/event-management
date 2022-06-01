import React from 'react'

import { Link } from 'react-router-dom'

function ConfirmRegistration() {
  const title = 'CSS Battle(s)'
  const description = `CSS code-golfing game is here! Use your CSS skills to replicate
    targets with smallest possible code. Feel free to check out the
    targets below and put your CSS skills to test.`
  const imgUrl = 'logo.png'

  return (
    <div className='my-10 px-10 w-full '>
      <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto p-10'>
        <div className='flex flex-col items-center pb-10 mt-10'>
          <img
            className='mb-3 w-24 h-24 rounded-full shadow-lg'
            src={imgUrl}
            alt='Event Cover'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900'>{title}</h5>
          <span className='text-sm text-gray-500 '>{description}</span>
          <div className='flex mt-4 space-x-3 lg:mt-6'>
            <button className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'>
              Confirm
            </button>
            <Link
              to={'/'}
              className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200'
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRegistration
