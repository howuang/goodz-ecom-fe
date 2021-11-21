import * as types from "../constants/auth.constant";
import api from "../../apiService";
import { toast } from "react-toastify";

const authAction = {};

authAction.register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.POST_REGISTER_REQUEST });
      const res = await api.post("/users", { name, email, password });
        dispatch({ type: types.POST_REGISTER_SUCCESS })
        toast.success("Verification code has been sent to your email")
    } catch (err) {
        console.log(err);
        dispatch({type: types.POST_REGISTER_FAIL})
    }
        };
        

authAction.login =  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.POST_LOGIN_REQUEST });
      const res = await api.post("/users/login", { email, password });
      console.log("logged in as", res.data.data.user)
        dispatch({ type: types.POST_LOGIN_SUCCESS, payload: res.data.data.user })
        api.defaults.headers.common["authorization"]= "Bearer " + res.data.data
        localStorage.setItem("token", res.data.data)
    } catch (err) {
        console.log(err);
        dispatch({type: types.POST_LOGIN_FAIL})
    }
};
        
authAction.loginWithGoogle =  () =>
  async (dispatch) => {
    try {
      dispatch({ type: types.GET_LOGIN_GOOGLE_REQUEST });
      const res = await api.get("/users/loginwithgoogle");
      console.log("logged in as", res.data.data.user)
        dispatch({ type: types.GET_LOGIN_GOOGLE_SUCCESS, payload: res.data.data.user })
        api.defaults.headers.common["authorization"]= "Bearer " + res.data.data
        localStorage.setItem("token", res.data.data)
    } catch (err) {
        console.log(err);
        dispatch({type: types.GET_LOGIN_GOOGLE_FAIL})
    }
        };

authAction.logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.PUT_LOGOUT_REQUEST, payload: null });
    const res = await api.put("/users/me");
    dispatch({ type: types.PUT_LOGOUT_SUCCESS});
    api.defaults.headers.common["authorization"] = "";
    localStorage.removeItem("token", res.data.data.accessToken)
    // toastAction.success("Log out successfully!");
  } catch (err) {
    console.log(err)
    dispatch({ type: types.PUT_LOGOUT_FAIL, payload: err });
  }
};


export default authAction;