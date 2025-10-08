import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateUserForm from "../components/Auth/UpdateUserForm";
import OrderDetail from "../components/Oders/OrderDetail";
import OrdersList from "../components/Oders/OrdersList";
import { getAccountThunk } from "../store/authSlice";
import { getAccountOrdersThunk } from "../store/ordersSlice";
import styles from "./Pages.module.scss";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const { user, error } = useSelector((state) => state.auth);
  const handleIsUpdate = () => setIsUpdate(!isUpdate);
  const {
    ordersAccount,
    error: errorOrders,
    isLoading,
  } = useSelector((state) => state.orders);
  useEffect(() => {
    if (!user) {
      dispatch(getAccountThunk());
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (ordersAccount.length === 0) {
      dispatch(getAccountOrdersThunk());
    }
  }, [dispatch, ordersAccount]);

  if (error) {
    navigate("/");
  }
  return (
    <section className={styles.wrapper}>
      <article className={styles["personal-info"]}>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
        <button onClick={handleIsUpdate}>Change personal info</button>
        {isUpdate && <UpdateUserForm setIsUpdate={setIsUpdate} />}
      </article>
      <div>{orderId && <OrderDetail orderId={orderId} />}</div>
      <div>
        {isLoading && <p>Loading...</p>}
        {errorOrders && <p>{errorOrders}</p>}
        {!isLoading && !errorOrders && ordersAccount?.length > 0 ? (
          <OrdersList orders={ordersAccount} setOrderId={setOrderId} />
        ) : (
          !isLoading && <p>Orders list empty</p>
        )}
      </div>
    </section>
  );
};
export default ProfilePage;
