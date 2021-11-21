import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import productReducer from "./product.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
    auth: authReducer,
    products: productReducer,
    users: userReducer,
    carts: cartReducer,
});