import Tabs from '../components/Navbar/Tabs'

import { useState } from 'react'

function Home() {
  const [isLeaderboardActive, setIsLeaderboardActive] = useState(false)

  return (
    <>
      <Tabs
        isLeaderboardActive={isLeaderboardActive}
        setIsLeaderboardActive={setIsLeaderboardActive}
      />
    </>
  )
}

export default Home
