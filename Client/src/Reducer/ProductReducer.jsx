import { ERROR, FETCH_DATA, LOADING, SINGLE_ERROR, SINGLE_FETCH, SINGLE_lOADING } from "../Action/actionType"

function ProductReducer(state, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case FETCH_DATA:
            return { ...state, loading: false, products: action.payload }
        case ERROR:
            return { ...state, loading: false, error: action.payload }
        case SINGLE_lOADING:
            return { ...state, singleLoading: true }
        case SINGLE_FETCH:
            return { ...state, singleLoading: false, product: action.payload }
        case SINGLE_ERROR:
            return { ...state, singleLoading: false, singleError: action.payload }
        default:
            return state
    }
}

export default ProductReducer