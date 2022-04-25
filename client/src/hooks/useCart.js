import { useCallback, useContext } from 'react'
import CartContext from '../CartContext'

import { addItemToBackend } from '../api/cart'

import useAuth from './useAuth'

const useCart = () => {
  const { loggedIn } = useAuth()
  const { cart, setCart } = useContext(CartContext)

  const addItem = useCallback(
    async (item) => {
      if (loggedIn) {
        //add to backend
        const result = await addItemToBackend(cart.id, item.id)
        if (result.name === 'error') {
          console.log('Already in Your Cart!')
          console.log(result)
        } else {
          console.log('ADD TO CART RESULT', result)
          item.qty = 1
          console.log('item', item)

          const newItems = [...cart.items, item]
          setCart({ ...cart, items: newItems })
        }
      } else {
        //add to localStorage
        item.qty = 1
        console.log('item', item)

        const newItems = [...cart.items, item]
        setCart({ ...cart, items: newItems })
      }
    },
    [loggedIn, cart, setCart]
  )

  const removeItem = useCallback(
    async (newItem) => {
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
