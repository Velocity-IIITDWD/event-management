import React from 'react'

function LoginToContinue() {
  return (
    <div className='mt-10 px-10 w-full'>
      <div className=''>
        <div className='block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 mx-auto px-5 border border-base-200'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Login to continue..
          </h5>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Login or Signup to continue to the previous page. Also get creds by
            signing up!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginToContinue
