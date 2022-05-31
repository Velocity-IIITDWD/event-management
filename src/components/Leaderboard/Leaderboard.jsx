import RankElement from './RankElement'

function Leaderboard() {
  return (
    <>
      <div>
        <div className='overflow-x-auto w-5/6 mx-auto'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Latest Points</th>
                <th>Total Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <RankElement
                rank={1}
                name='Pratik Pakhale'
                description='Won Hackathon'
                points='200'
                id=''
                lastPoints='50'
              />
            </tbody>
          </table>
        </div>
      </div>

      <div className='btn-group grid grid-cols-2 w-4/6 md:w-1/2 mx-auto mt-10'>
        <button className='btn btn-outline'>Previous page</button>
        <button className='btn btn-outline'>Next</button>
      </div>
    </>
  )
}

export default Leaderboard
