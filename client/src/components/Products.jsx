import React from 'react'
import useProducts from '../hooks/useProducts'
import SingleProduct from './SingleProduct'

const Products = () => {
  const { products } = useProducts()
  return (
    <div>
      {products.map((p, i) => (
        <SingleProduct key={`i-${i}`} product={p} />
      ))}
    </div>
  )
}

export default Products
