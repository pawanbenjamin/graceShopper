import React from 'react'
import Register from './components/Register'
import useAuth from './hooks/useAuth'
import useCart from './hooks/useCart'

import { logOut } from './api/auth'

function App() {
  const { user, setLoggedIn } = useAuth()
  const { cart } = useCart()

  console.log(cart)

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
    </div>
  )
}

export default App
