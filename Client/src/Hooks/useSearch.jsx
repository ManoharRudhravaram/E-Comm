import { useContext } from 'react'
import { searchContext } from '../Context/SearchContext'

 const useSearch = () => {
    return useContext(searchContext)
}

export default useSearch;
