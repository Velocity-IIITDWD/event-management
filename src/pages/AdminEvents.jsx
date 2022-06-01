import React from 'react'
import { Link } from 'react-router-dom'

function Events() {
  const EVENTS = [
    {
      title: 'CSS Battle(s)',
      description: `CSS code-golfing game is here! Use your CSS skills to replicate
    targets with smallest possible code. Feel free to check out the
    targets below and put your CSS skills to test.`,
      imgUrl: 'logo.svg',
      id: Math.random(),
    },
    {
      title: 'Extensive Workshop',
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sint praesentium error mollitia similique, dolor excepturi, voluptatem sequi nostrum debitis id saepe sapiente maxime voluptatum quod, beatae ipsum adipisci est.`,
      imgUrl: 'logo.svg',
      id: Math.random(),
    },
  ]

  return (
    <>
      <div className='mt-10 px-20'>
        <Link to={'/admin/events/new'} className='btn btn-accent btn-outline'>
          {' '}
          New Event{' '}
        </Link>
      </div>
      <div className='px-5'>
        {EVENTS.map(event => (
          <div
            key={event.id}
            className='card lg:card-side bg-base-100 drop-shadow-2xl w-full md:w-4/6 mx-auto my-5'
          >
            <figure className='px-10'>
              <img src={event.imgUrl} alt='Album' className='mt-10 lg:mt-0' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{event.title}</h2>
              <p>{event.description}</p>
              <div className='card-actions justify-end mt-5'>
                <Link
                  to={'/admin/events/edit/:eventId'}
                  className='btn btn-info btn-outline'
                >
                  Edit
                </Link>
                <Link
                  to={'/admin/registrations/:eventId'}
                  className='btn btn-secondary btn-outline'
                >
                  View Registrations
                </Link>
                <button className='btn btn-error btn-outline'>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Events
