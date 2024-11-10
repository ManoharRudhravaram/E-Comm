import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { host } from './AuthContext';

export let categoryContext = createContext();
function CategoryContext({ children }) {
    //state for category updates and calling api after updating
    let [changeCategory, setChangeCategory] = useState(false);
    let [categories, setCategories] = useState([])

    //get all categories from api
    async function getCategory() {
        try {
            let {data} = await axios.get(`${host}/api/v1/all-category`);
            let result=await data.category;
            setCategories(result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategory()
    }, [changeCategory])
    return (
        <categoryContext.Provider value={{categories,changeCategory, setChangeCategory}}>
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryContext