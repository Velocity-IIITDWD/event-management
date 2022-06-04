import { useState, useEffect, useCallback, useContext } from 'react'

import { authContext } from '../../store/authContext'

import { Link } from 'react-router-dom'

function Events() {
  const [events, setEvents] = useState([])
  const { studentId } = useContext(authContext)

  const fetchData = useCallback(async () => {
    const response = await fetch('/.netlify/functions/app/public/events')
    const data = await response.json()

    if (response.status === 200) {
      setEvents(data.events)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
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
                to={'/confirm-registration/' + event._id}
                className={`btn btn-accent ${
                  event.registrations.indexOf(studentId.toString()) !== -1
                    ? 'btn-disabled'
                    : 'btn-outline '
                }`}
              >
                {event.registrations.indexOf(studentId.toString()) !== -1
                  ? 'Registered'
                  : 'Register'}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Events
