import React from 'react'

import TimelineComponent from '../components/TimelineComponent'

function Timeline() {
  const DUMMY = Date.now()

  const timestamp =
    new Date(DUMMY).toDateString() +
    ' : ' +
    new Date(DUMMY).toLocaleTimeString()

  return (
    <div className='mt-10 px-10'>
      <div className='stats shadow mt-5 mb-10 mx-auto w-full'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Name</div>
          <div className='stat-value text-base md:text-xl'>Pratik Pakhale</div>
          <div className='stat-desc'>21BCS085</div>
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>Total Points</div>
          <div className='stat-value text-secondary'>200</div>
          <div className='stat-desc text-secondary'>Rank: 1</div>
        </div>
      </div>

      <ol className='relative border-l border-gray-200 dark:border-gray-700'>
        <TimelineComponent
          timestamp={timestamp}
          points={50}
          heading='Signup Bonus'
          description='Received signup bonus'
        />
        <TimelineComponent
          timestamp={timestamp}
          points={50}
          heading='Signup Bonus'
          description='Received signup bonus'
        />
        <TimelineComponent
          timestamp={timestamp}
          points={50}
          heading='Signup Bonus'
          description='Received signup bonus'
        />
      </ol>
    </div>
  )
}

export default Timeline
