import { useCallback, useContext } from 'react'
import CartContext from '../CartContext'

import useAuth from './useAuth'

const useCart = () => {
  const { loggedIn } = useAuth()
  const { cart, setCart } = useContext(CartContext)

  const addItem = useCallback(
    (item) => {
      if (loggedIn) {
        //add to backend
        console.log('item', item)
        const newItems = [...cart.items, item]
        setCart({ ...cart, items: newItems })
      } else {
        //add to localStorage
        console.log('item', item)
        const newItems = [...cart.items, item]
        setCart({ ...cart, items: newItems })
      }
    },
    [loggedIn, cart, setCart]
  )

  const removeItem = useCallback(
    (newItem) => {
      if (loggedIn) {
        //remove from backend
        const filteredItems = cart.items.filter((item) => {
          return item.id !== newItem.id
        })
        setCart({ ...cart, items: filteredItems })
      } else {
        //remove from localStorage
        const filteredItems = cart.items.filter((item) => {
          return item.id !== newItem.id
        })
        setCart({ ...cart, items: filteredItems })
      }
    },
    [loggedIn, cart, setCart]
  )

  return {
    cart,
    setCart,
    addItem,
    removeItem,
  }
}

export default useCart
