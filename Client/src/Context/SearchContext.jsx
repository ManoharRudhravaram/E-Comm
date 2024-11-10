import React, { createContext, useState } from 'react'

export let searchContext = createContext();
function SearchContext({ children }) {
    let [search,setSearch]=useState({keyword:'',result:[]});
    let [key,setKey]=useState("");
    return (
        <searchContext.Provider value={{search,setSearch,key,setKey}}>
            {children}
        </searchContext.Provider>
    )
}

export default SearchContext