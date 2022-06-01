import Navbar from './components/Nav/Navbar'
import LoginSignup from './components/Nav/LoginSignup'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Timeline from './pages/Timeline'
import Admin from './pages/Admin'
import AdminEvents from './pages/AdminEvents'

import { Routes, Route, Navigate } from 'react-router-dom'

import { useContext } from 'react'
import { authContext } from './store/authContext'
import NewEvent from './components/NewEvent'
import EditEvent from './components/EditEvent'
import ManageStudents from './pages/ManageStudents'
import ManageCreds from './components/ManageCreds'
import AddCreds from './components/AddCreds'
import EditCredits from './components/EditCredits'
import EventRegistrations from './components/EventRegistrations'

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
        <Route path='/timeline/:registrationNumber' element={<Timeline />} />
        <Route path='/admin' element={<Admin />} />'
        <Route path='/admin/events' element={<AdminEvents />} />
        <Route path='/admin/events/new' element={<NewEvent />} />
        <Route path='/admin/events/edit/:eventId' element={<EditEvent />} />
        <Route path='/admin/students' element={<ManageStudents />} />
        <Route
          path='/admin/students/managecreds/:registrationNumber'
          element={<ManageCreds />}
        />
        <Route
          path='/admin/students/managecreds/:registrationNumber/new'
          element={<AddCreds />}
        />
        <Route
          path='/admin/students/managecreds/:registrationNumber/edit/:timestamp'
          element={<EditCredits />}
        />
        <Route
          path='/admin/registrations/:eventId'
          element={<EventRegistrations />}
        />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

export default App
