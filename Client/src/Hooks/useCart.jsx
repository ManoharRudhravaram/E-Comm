import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'

function useCart() {
  return (
   useContext(cartContext)
  )
}

export default useCart;