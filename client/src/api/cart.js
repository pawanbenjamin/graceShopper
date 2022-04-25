export const fetchCart = async (userId) => {
  const response = await fetch(`/api/users/${userId}/cart`)
  const cart = await response.json()
  return cart
}

export const fetchLocalStorageCart = (products) => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  let existingItems = []
  for (const key in localCart) {
    const product = products.find((element) => element.id === +key)
    if (product) {
      product.qty = localCart[key]
      existingItems.push(product)
    }
  }
  return existingItems
}

export const addItemToBackend = async (orderId, productId) => {
  console.log({ orderId, productId })
  const response = await fetch(`/api/order_products/${orderId}/${productId}`, {
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export const removeItemFromBackend = async (orderId, productId) => {
  const response = await fetch(`/api/order_products/${orderId}/${productId}`, {
    method: 'DELETE',
  })
  const data = response.json()
  return data
}

export const addItemToLocalStorage = async (productId) => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  if (!localCart[productId]) {
    localCart[productId] = 1
  }
  localStorage.setItem('cart', JSON.stringify(localCart))
}

export const removeItemFromLocalStorage = async (productId) => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  for (const key in localCart) {
    console.log({ key, productId })
    if (+key === productId) {
      delete localCart[key]
    }
  }
  localStorage.setItem('cart', JSON.stringify(localCart))
}
