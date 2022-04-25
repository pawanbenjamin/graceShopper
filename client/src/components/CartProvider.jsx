import React, { useState, useEffect } from 'react'
import { fetchCart } from '../api/cart'
import CartContext from '../CartContext'
import useAuth from '../hooks/useAuth'
import useProducts from '../hooks/useProducts'

const CartProvider = ({ children }) => {
  const { user, loggedIn } = useAuth()
  const { products } = useProducts()
  console.log('Products', products)
  const [cart, setCart] = useState({ items: [], username: user.username })

  useEffect(() => {
    const getCart = async () => {
      if (loggedIn) {
        const cart = await fetchCart(user.id)
        setCart(cart)
      } else {
        // Check if there's a cart in localStorage
        if (localStorage.getItem('cart')) {
          const localCart = JSON.parse(localStorage.getItem('cart'))
          console.log('Guest Cart:', localCart)
          let existingItems = []
          for (const key in localCart) {
            const product = products.find((element) => element.id === +key)
            console.log('Product', product)
            if (product) {
              product.qty = localCart[key]
              existingItems.push(product)
            }
          }
          setCart({ items: existingItems, username: user.username })
        } else {
          localStorage.setItem('cart', JSON.stringify({}))
          setCart({ items: [], username: user.username })
        }
      }
    }
    getCart()
  }, [loggedIn, user, products])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
