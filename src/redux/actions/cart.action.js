import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../apiService";
import * as types from "../constants/cart.constant"

const cartActions = {};

cartActions.createCart = (cartProduct, quantity) => async (dispatch) => {
    try {
        dispatch({type: types.POST_TO_CART_REQUEST})
        let url = `/carts/${cartProduct}`;
        const res = await api.post(url, {
                productId: cartProduct,
                qty: quantity,
        });
        // console.log(res)
        toast.success("he product has been added to your shopping cart!")
        dispatch({ type: types.POST_TO_CART_SUCCESS})
    } catch (error) {
        console.log(error)
        dispatch({type: types.POST_TO_CART_FAIL})
    }
}

cartActions.addToCart = (cartProduct, quantity) => async (dispatch) => {
    try {
        dispatch({type: types.PUT_ADD_CART_REQUEST})
        let url = `/carts/add-product-cart`;
        const res = await api.put(url, [{
                productId: cartProduct,
                qty: quantity,
        }]);
        console.log("product to add", res.data)
        toast.success("The product has been added to your shopping cart!")
        dispatch(cartActions.getCart());
        dispatch({ type: types.PUT_ADD_CART_SUCCESS, payload: res.data})
    } catch (error) {
        console.log(error)
        dispatch({type: types.PUT_ADD_CART_FAIL})
    }
}



cartActions.getCart = () => async (dispatch)=> {
    try {
        dispatch({type: types.GET_CART_REQUEST})
        let url = `/carts/me`;
        const res = await api.get(url);
        dispatch({type: types.GET_CART_SUCCESS, payload: res.data.data.carts})
    } catch (error) {
        console.log(error)
        dispatch({type: types.GET_CART_FAIL, payload: error.message})
    }
}

cartActions.deleteCart = (cartId, {productId, qty}) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_CART_REQUEST});
        try {
            let url = `/carts/remove-product-cart/${cartId}`;
            const res = await api.delete(url, {
                productId: productId,
                qty: qty
            });
            console.log(res)
            dispatch(cartActions.getCart());
            dispatch({ type: types.DELETE_CART_SUCCESS})
        } catch (err) {
            console.log(err);
            dispatch({ type: types.DELETE_CART_FAIL})
        }
    }
}


export default cartActions;