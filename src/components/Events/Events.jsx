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
                to={'/confirm-registration/:eventId'}
                className='btn btn-accent btn-outline'
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Events
