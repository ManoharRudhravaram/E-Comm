import React, { useEffect } from 'react';
import useCart from '../../Hooks/useCart';
import toast from 'react-hot-toast';
import '../../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from 'react-i18next';

function AddToCart({ product }) {
  let {t}=useTranslation()
  const { cart, setCart } = useCart();
  function setCartHandler() {
    let found=cart.find((item)=>{
      return item._id==product._id;
    })
    if(found){
    let updated =  cart.map((item)=>{
        if(found._id==item._id){
          return {...item,count:item.count+1}
        }
        return item;
      })
      setCart(updated)
    }
    else{
      setCart([...cart, { ...product, count: 1 }]);
    }
    toast(`👍${t('toast.itemAdd')}`);
  }
  
  return (
    <button className="btn btn-primary ms-2" onClick={setCartHandler} disabled={product.quantity==0}>
      {t('product.addToCart')}
    </button>
  );
}

export default AddToCart;