import React from 'react'

function Tabs({ isLeaderboardActive, setIsLeaderboardActive }) {
  const handleEventsClick = () => {
    setIsLeaderboardActive(false)
  }

  const handleLeaderboardClick = () => {
    setIsLeaderboardActive(true)
  }

  return (
    <div className='tabs mt-8 mb-12 w-full px-5'>
      <button
        className={`tab tab-lifted w-1/2 ${
          !isLeaderboardActive && 'tab-active'
        }`}
        onClick={handleEventsClick}
      >
        Events
      </button>
      <button
        className={`tab tab-lifted w-1/2 ${
          isLeaderboardActive && 'tab-active'
        } `}
        onClick={handleLeaderboardClick}
      >
        Leaderboard
      </button>
    </div>
  )
}

export default Tabs
