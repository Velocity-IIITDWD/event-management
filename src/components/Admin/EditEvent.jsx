import React, { useState, useCallback, useEffect } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

function NewEvent() {
  const eventId = useLocation().pathname.replace('/admin/events/edit/', '')
  const domain = window.location.href.replace(useLocation().pathname, '')
  const endpoint = domain + '/.netlify/functions/app/events/' + eventId

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [points, setPoints] = useState('')
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true)

  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const getData = useCallback(async () => {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await response.json()

    if (response.status >= 200 && response.status < 300) {
      setTitle(data.event.title)
      setDescription(data.event.description)
      setImgUrl(data.event.imgUrl)
      setPoints(data.event.registrationPoints)
      setIsRegistrationOpen(data.event.isRegistrationOpen)
    }
  }, [endpoint])

  useEffect(() => {
    getData()
  }, [getData])

  const handleSubmit = async e => {
    e.preventDefault()

    if (title && description && imgUrl && points) {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imgUrl,
          registrationPoints: parseInt(points),
          isRegistrationOpen,
        }),
      })
      const data = await response.json()

      if (response.status >= 200 && response.status < 300) {
        setRegistrationSuccess(true)
        console.log(data)
      } else {
        setRegistrationSuccess(false)
        console.log(data)
        alert('something went wrong. check console / network tab')
      }
    }
  }

  return (
    <div className='px-5'>
      {registrationSuccess && <Navigate to='/admin/events' />}
      <form
        className='border border-base-200 p-10 my-10 w-full md:w-4/6 mx-auto rounded-lg shadow-md'
        onSubmit={handleSubmit}
      >
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
            placeholder='Title  '
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
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
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-300 focus:border-gray-300 '
            placeholder='Event Desscription'
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
            On Event Registration Points
          </label>
          <input
            type='number'
            id='points'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5'
            placeholder='15'
            required
            value={points}
            onChange={e => setPoints(e.target.value)}
          />
        </div>

        <div className='form-control w-full mb-5 flex flex-row'>
          <span className=''>Registration On?</span>
          <input
            type='checkbox'
            className='checkbox mx-5'
            checked={isRegistrationOpen}
            onChange={() => setIsRegistrationOpen(!isRegistrationOpen)}
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
