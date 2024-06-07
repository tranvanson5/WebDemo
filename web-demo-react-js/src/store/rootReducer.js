// rootReducer.js
import authReducer from './slice/authSlice';
import productsReducer from './slice/productSlice';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
});

export default rootReducer;
