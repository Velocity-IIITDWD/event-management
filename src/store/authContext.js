import React, { createContext, useState } from 'react'

const authContext = createContext({
  isAuthenticated: false,
  token: null,
  newToken: () => {},
  login: () => {},
  logout: () => {},
})

export { authContext }

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)

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
        login,
        logout,
        newToken,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
