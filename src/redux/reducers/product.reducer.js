import * as types from '../constants/product.constant'

const initialState = {
    products: [],
    loading: false,
    errorMessage: "",
    singleProduct: null,
    totalPages: 1,
    categories: [],
}

const productReducer = (state = initialState, action) => {
    const { type, payload, totalPage } = action;
    switch (type) {
        case types.GET_ALL_PRODUCTS_REQUEST:
            return { ...state, loading: true, errorMessage: "" }
        case types.GET_SINGLE_PRODUCT_REQUEST:
        case types.GET_PRODUCT_CATEGORY_REQUEST:
            return {...state, loading: true}
        case types.GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, products: payload, loading: false, totalPages: totalPage }
        case types.GET_SINGLE_PRODUCT_SUCCESS:
            return { ...state, singleProduct: payload, loading: false }
        case types.GET_PRODUCT_CATEGORY_SUCCESS:
            return { ...state, categories: payload, loading: false }
        case types.GET_ALL_PRODUCTS_FAIL:
        case types.GET_SINGLE_PRODUCT_FAIL:
        case types.GET_PRODUCT_CATEGORY_FAIL:
            return {...state, errorMessage: payload, loading: false}
        default:
            return state
    }
}

export default productReducer;