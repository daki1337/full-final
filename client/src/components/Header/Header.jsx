import { mdiPurseOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUserThunk } from "../../store/authSlice";
import { getAllCategoriesThunk } from "../../store/categoriesSlice";
import { resetOrders } from "../../store/ordersSlice";
import Search from "../Search/Search";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);
  const showCategory = (category) => (
    <li key={category._id}>
      <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
    </li>
  );
  const logout = () => {
    dispatch(logoutUserThunk());
    dispatch(resetOrders());
  };
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles["top-header"]}>
          <Search />
          <div>
            {user ? (
              <>
                <span>
                  <Link to="/account">Hi, {user?.name}</Link>
                </span>
                {user?.role === "admin" && (
                  <Link to="/admin-panel">Admin Panel</Link>
                )}
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Sign in</Link> |{" "}
                <Link to="/register">Sign up</Link>
              </>
            )}
          </div>
        </div>
        <div className={styles["middle-header"]}>
          <NavLink className={styles.logo} to="/">
            <img src="/logo.png" alt="" />
          </NavLink>
          <NavLink to="/cart" className={styles.cart}>
            <Icon path={mdiPurseOutline} size={1} />
            <span>{items.length}</span>
          </NavLink>
        </div>
        <nav>
          <ul className={styles["main-menu"]}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {categories?.map(showCategory)}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
