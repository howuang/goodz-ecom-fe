import * as types from "../constants/cart.constant"


const initialState = {
    loading: false,
    errorMessage: "",
    cart: [],
}

const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.POST_TO_CART_REQUEST:
        case types.GET_CART_REQUEST:
        case types.DELETE_CART_REQUEST:
        case types.PUT_ADD_CART_REQUEST:
            return { ...state, loading: true }
        case types.GET_CART_SUCCESS:
            return { ...state, cart: payload, loading: false }
        case types.POST_TO_CART_SUCCESS:
        case types.PUT_ADD_CART_SUCCESS:
        case types.DELETE_CART_SUCCESS:
        case types.GET_CART_FAIL:
        case types.POST_TO_CART_FAIL:
        case types.PUT_ADD_CART_FAIL:
        case types.DELETE_CART_FAIL:
            return { ...state, errorMessage: payload, loading: false }
        default:
             return state
    }
}

export default cartReducer;