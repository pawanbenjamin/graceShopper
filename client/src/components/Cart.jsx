import React from 'react'
import useCart from '../hooks/useCart'
import CartItem from './CartItem'

const Cart = () => {
  const { cart } = useCart()
  console.log('Cart', cart)

  return (
    <div>
      Your Cart:
      {cart.items.map((item, i) => (
        <CartItem key={`i${i}`} item={item} />
      ))}
    </div>
  )
}

export default Cart
