import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStatsThunk } from "../../store/statsSlice";

const AdminStats = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getAdminStatsThunk());
  }, [dispatch]);

  const { users, orders, products } = stats;

  return (
    <div>
      <table>
        <caption>Document Counts</caption>
        <thead>
          <tr>
            <th>Users</th>
            <th>Orders</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{users}</td>
            <td>{orders}</td>
            <td>{products}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminStats;
