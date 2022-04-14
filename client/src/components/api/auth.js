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

export const getMe = async (username) => {
  const response = await fetch(`/api/auth/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  })
  const data = await response.json()
  return data
}
