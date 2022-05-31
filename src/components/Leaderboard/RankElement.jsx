import React from 'react'

function RankElement({
  rank = 1,
  points = '',
  name = '',
  id = '',
  description = '',
  lastPoints = 'Hidden',
}) {
  return (
    <tr>
      <th>{rank}</th>
      <td>
        <div className='flex items-center space-x-3'>
          <div>
            <div className='font-bold btn btn-ghost'>{name}</div>
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
        <button className='btn btn-ghost btn-xs'>Timeline</button>
      </th>
    </tr>
  )
}

export default RankElement
