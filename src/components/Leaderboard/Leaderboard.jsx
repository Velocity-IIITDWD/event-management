import RankElement from './RankElement'

import { useState, useEffect } from 'react'

function Leaderboard() {
  const [students, setStudents] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchData = async page => {
    const response = await fetch(
      '/.netlify/functions/app/public/leaderboard/?page=' + page
    )
    const data = await response.json()

    if (response.status === 200) {
      // console.log(data)
      setStudents(data.students)
      setTotalPages(data.pages)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <div>
        {students.length === 0 ? (
          <div className='my-20 flex justify-center items-center'>
            <h1>No students signed up yet. </h1>
          </div>
        ) : (
          <div className='overflow-x-auto w-5/6 mx-auto'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <td>Rank</td>
                  <th>Name</th>
                  <th>Latest Points</th>
                  <th>Total Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  return (
                    <RankElement
                      rank={(page - 1) * 10 + index + 1}
                      name={student.name}
                      description={
                        student.creds[
                          student.creds.length - 1
                        ].description.slice(0, 22) + '..'
                      }
                      points={student.totalCreds}
                      key={student.registrationNumber}
                      lastPoints={
                        student.creds[student.creds.length - 1].points
                      }
                      registrationNumber={student.registrationNumber}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {students.length > 0 && (
        <div className='btn-group grid grid-cols-2 w-4/6 md:w-1/2 mx-auto my-10'>
          <button
            className={`btn ${page < 2 ? 'btn-disabled' : 'btn-outline '}`}
            onClick={prevPage}
          >
            Previous page
          </button>
          <button
            className={`btn ${
              page >= totalPages ? 'btn-disabled' : 'btn-outline '
            }`}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default Leaderboard
