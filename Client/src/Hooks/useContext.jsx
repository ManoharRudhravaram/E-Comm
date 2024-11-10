import { useContext } from "react"
import { categoryContext } from "../Context/CategoryContext"

//custom hook for categoriesGet
export let useCategory = () => {
    return useContext(categoryContext)
}