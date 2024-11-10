import axios from 'axios'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { host } from './AuthContext';
import reducer from '../Reducer/ProductReducer';
import { errorHandle, fetchData, initialData, singleData, singleErrorHandle, singleLoading } from '../Action/actionCreator';
export let productContext=createContext()
function ProductContext({children}) {
  let [changeProduct,setChangeProduct]=useState(false)
    let initialstate={
      loading:false,
      products:[],
      error:'',
      product:{},
      singleLoading:false,
      singleError:''
    }

    let [state,dispatch]=useReducer(reducer,initialstate)

    async function getAllProducts(){
        try {
          dispatch(initialData())
          let {data}=await axios.get(`${host}/api/v1/allproducts`);
          dispatch(fetchData(data.result))
        } catch (error) {
          console.log(error);
          dispatch(errorHandle(error))
        }
    }

    async function singleProduct(id){
     try { 
       dispatch(singleLoading())
       let {data}=await axios.get(`${host}/api/v1/singleproduct/${id}`)
       dispatch(singleData(data.result))
     } catch (error) {
      dispatch(singleErrorHandle(error))
     }
    }
    
    useEffect(()=>{
        getAllProducts()
    },[changeProduct])
    
  return (
    <productContext.Provider value={{...state,singleProduct,changeProduct,setChangeProduct}}>
        {children}
    </productContext.Provider>
  )
}

export default ProductContext