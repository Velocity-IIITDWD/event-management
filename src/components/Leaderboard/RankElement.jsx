import React, { useContext } from 'react'

import { authContext } from '../../store/authContext'
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
  const { type } = useContext(authContext)

  return (
    <tr>
      <td className='bg-slate-200 '>{rank}</td>
      <td>
        <div
          className={`flex items-center space-x-3 ${
            rank === 1 && 'bg-yellow-300 rounded'
          } ${rank === 2 && 'bg-gray-300 rounded'} ${
            rank === 3 && 'bg-yellow-700 rounded text-white'
          }`}
        >
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
        {type === 'admin' ? (
          <Link
            to={'/admin/students/' + registrationNumber}
            className='btn btn-ghost btn-xs'
          >
            Manage
          </Link>
        ) : (
          <Link
            to={'/timeline/' + registrationNumber}
            className='btn btn-ghost btn-xs'
          >
            Timeline
          </Link>
        )}
      </th>
    </tr>
  )
}

export default RankElement
