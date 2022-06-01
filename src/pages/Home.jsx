import Tabs from '../components/Nav/Tabs'
import Events from '../components/Events/Events'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import Footer from '../components/Footer'

import { useState } from 'react'

function Home() {
  const [isLeaderboardActive, setIsLeaderboardActive] = useState(false)

  return (
    <>
      <Tabs
        isLeaderboardActive={isLeaderboardActive}
        setIsLeaderboardActive={setIsLeaderboardActive}
      />

      {!isLeaderboardActive && (
        <>
          <Events /> <Footer />
        </>
      )}
      {isLeaderboardActive && <Leaderboard />}
    </>
  )
}

export default Home
