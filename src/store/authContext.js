import React, { createContext, useState } from 'react'

const authContext = createContext({
  isAuthenticated: false,
  token: null,
  type: 'student',
  registrationNumber: null,
  studentId: null,
  newToken: () => {},
  login: () => {},
  logout: () => {},
  setType: () => {},
  setRegistrationNumber: () => {},
  setStudentId: () => {},
})

export { authContext }

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [type, setType] = useState('student')
  const [registrationNumber, setRegistrationNumber] = useState(null)
  const [studentId, setStudentId] = useState(null)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken(null)
  }

  const newToken = newToken => {
    setToken(newToken)
  }

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        token,
        type,
        registrationNumber,
        studentId,
        login,
        logout,
        newToken,
        setType,
        setRegistrationNumber,
        setStudentId,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
