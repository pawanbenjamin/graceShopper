import { useContext } from 'react'
import CartContext from '../CartContext'

const useCart = () => {
  const { cart } = useContext(CartContext)

  return {
    cart,
  }
}

export default useCart
