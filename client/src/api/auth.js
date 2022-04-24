export const register = async (username, password) => {
  const response = await fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  const data = await response.json()
  return data
}

export const logOut = async () => {
  const response = await fetch('/api/auth/logout')
  const data = response.json()
  return data
}

export const getMe = async () => {
  const response = await fetch(`/api/auth/me`)
  const data = await response.json()
  return data
}
