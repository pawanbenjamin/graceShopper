import React, { useEffect, useState } from 'react'
import AuthContext from '../AuthContext'
import { fetchMe } from '../api/auth'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'guest' })
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const me = await fetchMe()
      console.log('me', me)
      if (me.loggedIn === false) {
        setUser({ username: 'guest' })
      } else {
        setUser(me)
        setLoggedIn(true)
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
