import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersForAdminThunk } from "../../store/ordersSlice";
import Pagination from "../Pagination/Pagination";
import AdminOrderRow from "./AdminOrderRow";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, totalOrders } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(2);
  useEffect(() => {
    dispatch(getOrdersForAdminThunk({ page, amount }));
  }, [dispatch, orders?.length, page, amount]);
  const showOrder = (order) => <AdminOrderRow key={order._id} order={order} />;
  return (
    <section>
      <h2>Orders</h2>
      <Pagination
        page={page}
        setPage={setPage}
        amount={amount}
        setAmount={setAmount}
        totalItems={totalOrders}
      />
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>User email</th>
            <th colSpan={4}>Shipping</th>
            <th rowSpan={1}>Products</th>
            <th rowSpan={2}>Total</th>
            <th rowSpan={2}>Summa</th>
            <th rowSpan={2}>Status</th>
            <th rowSpan={2}>Update status</th>
          </tr>
          <tr>
            <th>Phone</th>
            <th>Method</th>
            <th>Address</th>
            <th>Price</th>
            <th>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
              </table>
            </th>
          </tr>
        </thead>
        <tbody>{orders.map(showOrder)}</tbody>
      </table>
    </section>
  );
};
export default AdminOrders;
