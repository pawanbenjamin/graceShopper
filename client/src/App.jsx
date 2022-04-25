import React from 'react'
import Register from './components/Register'

import useAuth from './hooks/useAuth'

import { logOut } from './api/auth'
import Products from './components/Products'
import Cart from './components/Cart'
import Login from './components/Login'

function App() {
  const { user, setLoggedIn } = useAuth()

  console.log('USER', user)

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Hello, {user.username}!</h3>
      <button
        onClick={async () => {
          const result = await logOut()
          console.log(result)
          setLoggedIn(false)
        }}
      >
        Logout
      </button>
      <Register />
      <Login />
      <Products />
      <Cart />
    </div>
  )
}

export default App
