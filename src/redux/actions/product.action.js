import * as types from '../constants/product.constant'
import api from '../../apiService';


const productAction = {};

productAction.getAllProducts = ({ page, limit, query }) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null })
        let url = `/products?page=${page}&limit=${limit}`
        if (query) url += `&q=${query}`;
        const res = await api.get(url)
        // console.log("res", res.data.data.result)
        dispatch({ type: types.GET_ALL_PRODUCTS_SUCCESS, payload: res.data.data.result, totalPage: res.data.data.result.length })
    } catch (error) {
        console.log(error)
        dispatch({ type: types.GET_ALL_PRODUCTS_FAIL, payload: error.message })
    }
};


productAction.getSearchProducts = ({page, limit, query}) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null })
        let url = `/products?page=${page}&limit=${limit}`
        if (query) url += `&q=${query}`;
        const res = await api.get(url)
        dispatch({type: types.GET_ALL_PRODUCTS_SUCCESS, payload: res.data.results.products, totalPage: res.data.data.totalPages})
    } catch (error) {
        console.log(error)
        dispatch({type: types.GET_ALL_PRODUCTS_FAIL, payload: error.message})
    }
}


productAction.getDetail = ({productId}) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST })
        let url = `/products/${productId}`;
        const res = await api.get(url);
        // console.log("single product", res.data.data.result)
        dispatch({type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: res.data.data.result})
        
    } catch (error) {
        console.log(error)
        dispatch({type: types.GET_SINGLE_PRODUCT_FAIL, payload: error.message})
    }
}

productAction.getCategories = ({categories}) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_PRODUCT_CATEGORY_REQUEST })
        let url = `/products/categories/${categories}`;
        const res = await api.get(url);
        dispatch({type: types.GET_PRODUCT_CATEGORY_SUCCESS, payload: res.data.data.products})
    } catch (error) {
        console.log(error)
        dispatch({type: types.GET_PRODUCT_CATEGORY_FAIL, payload: error.message})
    }
}

export default productAction;