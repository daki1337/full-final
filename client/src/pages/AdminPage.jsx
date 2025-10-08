import { Link, Outlet } from "react-router-dom";
import styles from "./Pages.module.scss";

const AdminPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin-panel/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin-panel/products">Products</Link>
        </li>
        <li>
          <Link to="/admin-panel/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin-panel/stats">Stats</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminPage;
