import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminStats from "./components/Admin/AdminStats";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Header from "./components/Header/Header";
import AdminPage from "./pages/AdminPage";
import CancelPage from "./pages/CancelPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import SaleProductsPage from "./pages/SaleProductsPage";
import SearchResultPage from "./pages/SearchResultPage";
import SuccessPage from "./pages/SuccessPage";
import { getAccountThunk } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAccountThunk());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success/:orderId" element={<SuccessPage />} />
          <Route path="/cancel/:orderId" element={<CancelPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/sale-products" element={<SaleProductsPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route
            path="/admin-panel"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />
            }
          >
            <Route
              path="/admin-panel/categories"
              element={
                user?.role === "admin" ? (
                  <AdminCategories />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin-panel/products"
              element={
                user?.role === "admin" ? <AdminProducts /> : <Navigate to="/" />
              }
            />
            <Route
              path="/admin-panel/orders"
              element={
                user?.role === "admin" ? <AdminOrders /> : <Navigate to="/" />
              }
            />
            <Route
              path="/admin-panel/stats"
              element={
                user?.role === "admin" ? <AdminStats /> : <Navigate to="/" />
              }
            />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
