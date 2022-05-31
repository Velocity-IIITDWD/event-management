import React, { createContext, useState } from 'react'

const authContext = createContext({
  isAuthenticated: false,
  token: null,
  type: 'student',
  newToken: () => {},
  login: () => {},
  logout: () => {},
  setType: () => {},
})

export { authContext }

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [type, setType] = useState('student')

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
        login,
        logout,
        newToken,
        setType,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
