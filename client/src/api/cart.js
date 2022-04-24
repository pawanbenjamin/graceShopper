export const fetchCart = async (userId) => {
  const response = await fetch(`/api/users/${userId}/cart`)
  const cart = await response.json()
  return cart
}
