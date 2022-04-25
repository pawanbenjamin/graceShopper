import { useState, useEffect } from 'react'
import { fetchProducts } from '../api/products'
import ProductsContext from '../ProductsContext'

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts()
      setProducts(products)
    }
    getProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider
