import * as types from "../constants/user.constant"
const initialState = {
    currentUser: {},
    loading: false
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.POST_REVIEW_REQUEST:
        case types.GET_SINGLE_USER_REQUEST:
            return { ...state, loading: true }
        case types.POST_REVIEW_SUCCESS:
            return {...state, user: payload, loading: false}
        case types.GET_SINGLE_USER_SUCCESS:
            return{...state, currentUser: payload, loading: false}
        case types.POST_REVIEW_FAIL:
        case types.GET_SINGLE_USER_FAIL:
            return {...state, loading: false}
        default:
            return state
    }
}

export default userReducer;