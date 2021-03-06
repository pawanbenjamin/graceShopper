import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { login } from '../api/auth'

const Login = () => {
  const { setUser, setLoggedIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // This is hard coded but you can write a form and create a user!
    const data = await login(username, password)

    // If we get back and error from our function:
    if (data.name === 'error') {
      // Display the description of the error
      setError(data.detail)
    } else {
      setError(null)
      setUser(data.user)
      setLoggedIn(true)
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {error ? <h3>Error! {error}</h3> : null}
      <form onSubmit={handleSubmit}>
        <h4>Already a user?</h4>
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
        <button type="submit">Login!</button>
      </form>
    </div>
  )
}

export default Login
