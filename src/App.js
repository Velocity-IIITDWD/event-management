import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
