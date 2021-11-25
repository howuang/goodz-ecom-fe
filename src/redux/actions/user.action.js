import * as types from "../constants/user.constant";
import api from "../../apiService";
import { toast } from "react-toastify";
import productAction from "./product.action";

const userActions = {};

userActions.getCurrentUser = () => async (dispatch) => {
    try {
      dispatch({ type: types.GET_SINGLE_USER_REQUEST });
        const res = await api.get("/users/me");
        // console.log("current user", res.data.data)
        dispatch({type: types.GET_SINGLE_USER_SUCCESS, payload: res.data.data})
    } catch (err) {
        console.log(err);
        dispatch({type: types.GET_SINGLE_USER_FAIL})
    }
};

userActions.updateCurrentUser = ({ name, email, password, avatar }) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_USER_REQUEST });
        const res = await api.put(`users/update-me`, { name, email, password, avatar });
        dispatch({ type: types.UPDATE_USER_SUCCESS });
        dispatch(userActions.getCurrentUser());
        toast.success("You've successfully updated your information");
    } catch (err) {
        console.log(err);
        toast.error(err.message);
        dispatch({ type: types.UPDATE_USER_FAIL });
    }
};

userActions.postOrder = (cartId) => {
    return async (dispatch) => {
        dispatch({ type: types.POST_ORDER_REQUEST });
        try {
            console.log(cartId, "cardId");
            const res = await api.put(`/carts/payment/${cartId}`);
            dispatch({ type: types.POST_ORDER_SUCCESS });
            dispatch(userActions.getCartProduct());
            toast.success("We've received your order. Thanks for shopping with us!");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({ type: types.POST_ORDER_FAIL });
        }
    }
};

userActions.postReview = ({ productId, review, rating}) => {
    return async (dispatch) => {
        dispatch({type: types.POST_REVIEW_REQUEST});
        try {
            const res = await api.post(`/comments/${productId}`, {
                "content": review
          });
            dispatch({type: types.POST_REVIEW_SUCCESS});
            dispatch(productAction.getDetail({productId}));
            dispatch(userActions.getAllComment({productId}))
            toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

userActions.getAllComment = ({productId}) => async (dispatch) => {
    try {
      dispatch({ type: types.GET_ALL_COMMENT_REQUEST });
      const res = await api.get(`/comments/${productId}`);
      console.log(productId, "here");
      console.log(res,"data");
      dispatch({ type: types.GET_ALL_COMMENT_SUCCESS, payload:res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.GET_ALL_COMMENT_FAIL });
    }
}

userActions.putReview = ({ updateComment, comment, rating, productId}) => {
    return async (dispatch) => {
        dispatch({type: types.POST_REVIEW_REQUEST});
        try {
            const res = await api.put(`/comments/${updateComment}`, {
                "content": comment
          });
            dispatch({type: types.POST_REVIEW_SUCCESS});
            dispatch(userActions.getAllComment({productId}))
            // toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

userActions.deleteReview = ({deleteReview, productId}) => {
    return async (dispatch) => {
        dispatch({type: types.DELETE_REVIEW_REQUEST});
        try {
            const res = await api.delete(`comments/${deleteReview}`);
            dispatch({type: types.DELETE_REVIEW_SUCCESS});
            dispatch(userActions.getAllComment({productId}))
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
}


export default userActions;