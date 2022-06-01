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
import NewEvent from './components/Admin/NewEvent'
import EditEvent from './components/Admin/EditEvent'
import ManageStudents from './pages/ManageStudents'
import ManageStudentCreds from './components/Admin/ManageStudentCreds'
import AddCreds from './pages/AddCreds'
import EditStudentCredits from './components/Admin/EditStudentCredits'
import EventRegistrations from './components/Admin/EventRegistrations'
import CredRewards from './components/CredRewards'
import ManageCreds from './pages/ManageCreds'
import ConfirmRegistration from './components/Events/ConfirmRegistration'
import LoginToContinue from './components/LoginToContinue'

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
        <Route
          path='/confirm-registration/:eventId'
          element={<ConfirmRegistration />}
        />
        <Route path='/admin' element={<Admin />} />'
        <Route path='/admin/events' element={<AdminEvents />} />
        <Route path='/admin/events/new' element={<NewEvent />} />
        <Route path='/admin/events/edit/:eventId' element={<EditEvent />} />
        <Route path='/admin/students' element={<ManageStudents />} />
        <Route path='/admin/creds' element={<ManageCreds />} />
        <Route
          path='/admin/students/managecreds/:registrationNumber'
          element={<ManageStudentCreds />}
        />
        <Route
          path='/admin/students/managecreds/:registrationNumber/new'
          element={<AddCreds />}
        />
        <Route path='/admin/creds/new' element={<AddCreds />} />
        <Route
          path='/admin/students/managecreds/:registrationNumber/edit/:timestamp'
          element={<EditStudentCredits />}
        />
        <Route
          path='/admin/registrations/:eventId'
          element={<EventRegistrations />}
        />
        <Route path='/qrcode/:id' element={<CredRewards />} />
        <Route path='/login-to-continue' element={<LoginToContinue />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

export default App
