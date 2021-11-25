import * as types from "../constants/user.constant"
const initialState = {
    currentUser: {},
    loading: false,
    comment: null
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.POST_REVIEW_REQUEST:
        case types.GET_SINGLE_USER_REQUEST:
        case types.UPDATE_USER_REQUEST:
        case types.POST_ORDER_REQUEST:
        case types.GET_ALL_COMMENT_REQUEST:
        case types.DELETE_REVIEW_REQUEST:
            return { ...state, loading: true }
        case types.POST_REVIEW_SUCCESS:
        case types.UPDATE_USER_SUCCESS:
            return {...state, user: payload, loading: false}
        case types.GET_SINGLE_USER_SUCCESS:
            return { ...state, currentUser: payload, loading: false }
        case types.GET_ALL_COMMENT_SUCCESS:
            return{...state, comments: payload, loading: false}
        case types.POST_REVIEW_FAIL:
        case types.GET_SINGLE_USER_FAIL:
        case types.UPDATE_USER_FAIL:
        case types.POST_ORDER_SUCCESS:
        case types.POST_ORDER_FAIL:
        case types.GET_ALL_COMMENT_FAIL:
        case types.DELETE_REVIEW_SUCCESS:
        case types.DELETE_REVIEW_FAIL:
            return {...state, loading: false}
        default:
            return state
    }
}

export default userReducer;