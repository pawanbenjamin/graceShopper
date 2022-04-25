export const fetchProducts = async () => {
  const response = await fetch('/api/products')
  const products = response.json()
  return products
}
