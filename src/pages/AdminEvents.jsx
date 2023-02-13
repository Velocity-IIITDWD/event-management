import { useState, useEffect, useCallback } from 'react'

import { Link } from 'react-router-dom'

function Events() {
  const [events, setEvents] = useState([])

  const fetchData = useCallback(async () => {
    const response = await fetch('/.netlify/functions/app/events', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await response.json()

    if (response.status === 200) {
      setEvents(
        data.events.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
      )
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteEvent = async id => {
    const confirm = window.confirm(
      'Are you sure you want to delete this event?'
    )

    if (!confirm) {
      return
    }

    const response = await fetch(`/.netlify/functions/app/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    const data = await response.json()

    if (response.status === 200) {
      fetchData()
    } else {
      alert('something went wrong. check console / network tab')
      console.log(data)
    }
  }

  return (
    <>
      <div className='mt-10 px-20'>
        <Link to={'/admin/events/new'} className='btn btn-accent btn-outline'>
          {' '}
          New Event{' '}
        </Link>
      </div>
      <div className='px-5'>
        {events.map(event => (
          <div
            key={event._id}
            className='card lg:card-side bg-base-100 drop-shadow-2xl w-full md:w-4/6 mx-auto my-5'
          >
            <figure className='px-10'>
              <img
                src={event.imgUrl}
                alt='Album'
                className='mt-10 lg:mt-0 h-60 w-60'
              />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{event.title}</h2>
              <p>{event.description}</p>
              <div className='card-actions justify-end mt-5'>
                <Link
                  to={'/admin/events/edit/' + event._id}
                  className='btn btn-info btn-outline'
                >
                  Edit
                </Link>
                <Link
                  to={'/admin/registrations/' + event._id}
                  className='btn btn-secondary btn-outline'
                >
                  View Registrations
                </Link>
                <Link
                  to={'/admin/verify/' + event._id}
                  className='btn btn-secondary btn-outline'
                >
                  Verify
                </Link>
                <button
                  className='btn btn-error btn-outline'
                  onClick={() => {
                    deleteEvent(event._id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Events
