import { useState, useRef } from 'react'
import { register } from './api/auth'

const Register = () => {
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // This is hard coded but you can write a form and create a user!
    const data = await register(username, password)

    // If we get back and error from our function:
    if (data.name === 'error') {
      // Display the description of the error
      setError(data.detail)
    } else {
      setError(null)
      setUser(data.user)
    }
  }

  return (
    <div>
      {error ? <h3>Error! {error}</h3> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Register!</button>
      </form>
      {user ? <h3>Hello {user.username}</h3> : null}
    </div>
  )
}

export default Register
