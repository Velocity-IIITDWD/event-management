import { useState, useEffect, useCallback, useContext } from 'react'

import { authContext } from '../../store/authContext'

import { Link } from 'react-router-dom'

function Events() {
  const [events, setEvents] = useState([])
  const { studentId } = useContext(authContext)

  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    if (!loading) return

    const response = await fetch('/.netlify/functions/app/public/events')
    const data = await response.json()
    // console.log(data)
    if (response.status === 200) {
      setEvents(data.events)
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='px-5'>
      {events.length === 0 && (
        <div className='my-20 flex justify-center items-center'>
          <h1>No events yet. </h1>
        </div>
      )}
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
                  event.registrations.indexOf(studentId) !== -1
                    ? 'btn-disabled'
                    : 'btn-outline '
                }`}
              >
                {event.registrations.indexOf(studentId) !== -1
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
