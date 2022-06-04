import React, { useState } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

function AddStudentCreds() {
  const registrationNumber = useLocation().pathname.split('/')[4]

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if (title === '' || description === '' || points === '') {
      setSuccess(false)
      return
    }

    const response = await fetch(
      `/.netlify/functions/app/students/creds/${registrationNumber}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          points: parseInt(points),
        }),
      }
    )

    const data = await response.json()

    if (response.status === 200) {
      setSuccess(true)
    } else {
      setSuccess(false)
      console.log(data)
      alert('something went wrong, check log / network tab')
    }
  }

  return (
    <div className='px-5'>
      {success && (
        <Navigate to={'/admin/students/managecreds/' + registrationNumber} />
      )}
      <form
        className='border border-base-200 p-10 my-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'
        onSubmit={handleSubmit}
      >
        <div className='mb-6'>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='Title'
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='des'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Description
          </label>
          <textarea
            id='des'
            rows='4'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
            placeholder='Event Description'
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='points'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Points
          </label>
          <input
            type='number'
            id='points'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='Points'
            required
            value={points}
            onChange={e => setPoints(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-800 hover:bg-blue-800 focus:ring-gray-300 focus:border-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddStudentCreds
