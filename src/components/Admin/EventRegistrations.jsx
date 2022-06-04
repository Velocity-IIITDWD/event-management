import { useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

function EventRegistrations() {
  const eventId = useLocation().pathname.replace('/admin/registrations/', '')
  const domain = window.location.href.replace(useLocation().pathname, '')
  const endpoint = domain + '/api/registrations/view/' + eventId

  const [registrations, setRegistrations] = useState([])

  const fetchData = useCallback(async () => {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await response.json()

    if (response.status === 200) {
      setRegistrations(data.registrations)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='mt-10 px-10'>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Registration Number</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={registration._id}>
                <th>{index + 1}</th>
                <td>{registration.name}</td>
                <td>
                  <span className='badge badge-ghost badge-sm text-md px-10 py-5 font-bold '>
                    {registration.registrationNumber}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventRegistrations
