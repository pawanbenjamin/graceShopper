import { useCallback, useContext } from 'react'
import CartContext from '../CartContext'

import {
  addItemToBackend,
  removeItemFromBackend,
  addItemToLocalStorage,
  removeItemFromLocalStorage,
  editQtyInBackend,
} from '../api/cart'

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
        } else {
          item.qty = 1
          const newItems = [...cart.items, item]
          setCart({ ...cart, items: newItems })
        }
      } else {
        //add to localStorage
        addItemToLocalStorage(item.id)
        item.qty = 1
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
        await removeItemFromBackend(cart.id, newItem.id)
        const filteredItems = cart.items.filter((item) => {
          return item.id !== newItem.id
        })
        setCart({ ...cart, items: filteredItems })
      } else {
        //remove from localStorage
        removeItemFromLocalStorage(newItem.id)
        const filteredItems = cart.items.filter((item) => {
          return item.id !== newItem.id
        })
        setCart({ ...cart, items: filteredItems })
      }
    },
    [loggedIn, cart, setCart]
  )

  const editQty = useCallback(
    async (itemId, newQty) => {
      if (loggedIn) {
        await editQtyInBackend(cart.id, itemId, newQty)

        const mappedItems = cart.items.map((item) => {
          if (item.id === itemId) {
            item.qty = newQty
          }
          return item
        })
        setCart({ ...cart, items: mappedItems })
      } else {
      }
    },
    [loggedIn, cart, setCart]
  )

  return {
    cart,
    setCart,
    addItem,
    removeItem,
    editQty,
  }
}

export default useCart
