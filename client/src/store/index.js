import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import categoriesReducer from "./categoriesSlice";
import ordersReducer from "./ordersSlice";
import productsReducer from "./productsSlice";
import statsReducer from "./statsSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    stats: statsReducer,
  },
});

export default store;
