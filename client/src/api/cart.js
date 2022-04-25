export const fetchCart = async (userId) => {
  const response = await fetch(`/api/users/${userId}/cart`)
  const cart = await response.json()
  console.log('CARRRRT', cart)
  return cart
}

export const addItemToBackend = async (orderId, productId) => {
  console.log({ orderId, productId })
  const response = await fetch(`/api/order_products/${orderId}/${productId}`, {
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export const addItemToLocalStorage = async () => {}
