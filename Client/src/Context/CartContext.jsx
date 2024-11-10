import React, { createContext, useEffect, useState } from 'react'
export let cartContext = createContext();
function CartContext({ children }) {
  let [cart, setCart] = useState(getCartData());

  function getCartData() {
    return localStorage.getItem('E1_Ecom') ? JSON.parse(localStorage.getItem('E1_Ecom')) : []
  }
  
  useEffect(() => {
    localStorage.setItem('E1_Ecom', JSON.stringify(cart))
  }, [cart])
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  )
}

export default CartContext