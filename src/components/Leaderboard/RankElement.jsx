import React from 'react'

import { Link } from 'react-router-dom'

function RankElement({
  rank = 1,
  points = '',
  name = '',
  id = '',
  description = '',
  lastPoints = 'Hidden',
  registrationNumber = '',
}) {
  return (
    <tr>
      <th>{rank}</th>
      <td>
        <div className='flex items-center space-x-3'>
          <div>
            <Link
              to={'/timeline/' + registrationNumber}
              className='font-bold btn btn-ghost'
            >
              {name}
            </Link>

            <Link
              to={'/timeline/' + registrationNumber}
              className='badge badge-ghost badge-sm'
            >
              {registrationNumber}
            </Link>
          </div>
        </div>
      </td>
      <td>
        {description}
        <br />
        <span className='badge badge-ghost badge-sm'>{lastPoints} Points</span>
      </td>
      <td>{points}</td>
      <th>
        <Link
          to={'/timeline/' + registrationNumber}
          className='btn btn-ghost btn-xs'
        >
          Timeline
        </Link>
      </th>
    </tr>
  )
}

export default RankElement
