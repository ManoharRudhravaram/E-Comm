import React, { createContext, useContext, useEffect, useState } from 'react'
export let host=import.meta.env.VITE_SECRET_KEY;

let authContext = createContext();
function AuthContext({ children }) {

    //local storage for token
    function getToken() {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : { user: '', token: null }
    }

    let [auth, setAuth] = useState(getToken())

    useEffect(() => {
        localStorage.setItem('token',JSON.stringify(auth))
    }, [auth])
    return (
        <authContext.Provider value={{auth,setAuth}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContext

export let useAuth=()=>{
    let {auth,setAuth}= useContext(authContext)
    return {auth,setAuth}
}