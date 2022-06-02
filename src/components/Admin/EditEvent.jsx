import React from 'react'

function NewEvent() {
  return (
    <div className='px-5'>
      <form className='border border-base-200 p-10 my-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'>
        <div className='mb-6'>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Event Title
          </label>
          <input
            type='text'
            id='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='heading'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='img'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Image URL
          </label>
          <input
            type='text'
            id='img'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='drive.google.com/*'
            required
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='des'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Event Description
          </label>
          <textarea
            id='des'
            rows='4'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
            placeholder='Event Desscription'
          ></textarea>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='points'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            On Event Registration Points
          </label>
          <input
            type='number'
            id='points'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='15'
            required
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-gray-300 focus:border-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Edit
        </button>
      </form>
    </div>
  )
}

export default NewEvent
