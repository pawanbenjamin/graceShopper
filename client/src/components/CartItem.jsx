import React from 'react'

import useCart from '../hooks/useCart'

const CartItem = ({ item }) => {
  const { editQty } = useCart()

  return (
    <div>
      <h6>{item.name}</h6>
      <h6>Qty: {item.qty}</h6>
      <button onClick={() => editQty(item.id, ++item.qty)}>+</button>
      <button onClick={() => editQty(item.id, --item.qty)}>-</button>
    </div>
  )
}

export default CartItem
