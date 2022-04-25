import React, { useState, useEffect } from 'react'
import { fetchCart } from '../api/cart'
import CartContext from '../CartContext'
import useAuth from '../hooks/useAuth'

const CartProvider = ({ children }) => {
  const { user, loggedIn } = useAuth()

  const [cart, setCart] = useState({ items: [], username: user.username })

  useEffect(() => {
    const getCart = async () => {
      if (loggedIn) {
        const cart = await fetchCart(user.id)
        setCart(cart)
      } else {
        // Check if there's a cart in localStorage

        setCart({ items: [], username: user.username })
      }
    }
    getCart()
  }, [loggedIn])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
