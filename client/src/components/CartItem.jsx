import React from 'react'

const CartItem = ({ item }) => {
  return (
    <div>
      <h6>{item.name}</h6>
      <h6>Qty: {item.qty}</h6>
    </div>
  )
}

export default CartItem
