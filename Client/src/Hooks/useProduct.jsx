import { useContext } from "react"
import { productContext } from "../Context/ProductContext"

let useProduct=()=>{
    return useContext(productContext)
}
export default useProduct;