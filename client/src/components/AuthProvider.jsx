import React, { Children, useEffect, useState } from 'react'
import AuthContext from '../AuthContext'
import { getMe } from '../api/auth'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'guest' })
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const me = await getMe()
      if (me.loggedIn === false) {
        setUser({ username: 'guest' })
      } else {
        setUser(me)
      }
    }
    getUser()
  }, [loggedIn])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
