import Navbar from './components/Nav/Navbar'
import LoginSignup from './components/Nav/LoginSignup'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Timeline from './pages/Timeline'

import { Routes, Route, Navigate } from 'react-router-dom'

import { useContext } from 'react'
import { authContext } from './store/authContext'

function App() {
  const { isAuthenticated } = useContext(authContext)

  return (
    <>
      <Navbar />
      {!isAuthenticated && <LoginSignup />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/timeline/:registrationNumber'
          exact
          element={<Timeline />}
        />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

export default App
