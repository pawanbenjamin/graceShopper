import React from 'react'

import useCart from '../hooks/useCart'

const SingleProduct = ({ product }) => {
  const { addItem, cart } = useCart()

  return (
    <div>
      <h3>{product.name}</h3>
      <h4>{product.description}</h4>
      <h4>{product.price}</h4>
      {cart.items.filter((item) => {
        if (item.name === product.name) {
          return item
        }
      }).length ? (
        <h5>Already in Cart!</h5>
      ) : (
        <button onClick={() => addItem(product)}>Add to Cart</button>
      )}
    </div>
  )
}

export default SingleProduct
