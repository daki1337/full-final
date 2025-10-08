import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateOrderStatusThunk } from "../store/ordersSlice";
const SuccessPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateOrderStatusThunk({ id: orderId, status: "paid" }));
  }, [dispatch, orderId]);
  
  return (
    <section>
      <h2>Thanks!</h2>
      <Link to="/">return to shop</Link>
    </section>
  );
};
export default SuccessPage;
