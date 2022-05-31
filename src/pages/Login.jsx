import React from 'react'

function Login() {
  return (
    <div className='px-5'>
      <form className='border border-base-200 p-10 mt-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Registration Number
          </label>
          <input
            type='text'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='eg. 21bcs069'
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
            placeholder='passowrd'
            required
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Submit
        </button>

        <span className='mt-3 block text-xs opacity-90 text-slate-600 rounded-lg width-auto'>
          Forgot Password? Contact Team Velocity / 21BCS085
        </span>
      </form>
    </div>
  )
}

export default Login
