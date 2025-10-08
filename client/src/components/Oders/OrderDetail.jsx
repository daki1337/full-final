import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession } from "../../api";
import CONSTANTS from "../../constants";
import { getOrderByIdThunk } from "../../store/ordersSlice";
import styles from "./Orders.module.scss";

const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const OrderDetail = ({ orderId }) => {
  const dispatch = useDispatch();
  const { selectedOrder, isLoading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderByIdThunk(orderId));
    }
  }, [dispatch, orderId]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedOrder) return <p>No order selected</p>;
  const {
    user,
    products,
    shippingPhone,
    shippingMethod,
    shippingAddress,
    shippingPrice,
    totalSumma,
    status,
    createdAt,
  } = selectedOrder;

  const stripeProducts = products.map((product) => ({
    title: product.productId?.title,
    productPrice: product.productPrice,
    quantity: product.quantity,
  }));

  const handlePayment = async () => {
    const stripe = await stripePromise;
    console.log(stripeProducts);
    const response = await createCheckoutSession(
      selectedOrder._id,
      stripeProducts
    );

    await stripe.redirectToCheckout({ sessionId: response.data.id });
  };

  return (
    <div className={styles["order-details"]}>
      <h3>Order Details</h3>
      <table>
        <tbody>
          <tr>
            <td>Order ID</td>
            <td>{selectedOrder._id}</td>
          </tr>
          <tr>
            <td>User</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{status}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{new Date(createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td colSpan="2">
              <h4>Products</h4>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map(
                    ({ productId, quantity, productPrice, _id }) => (
                      <tr key={_id}>
                        <td>{productId?.title}</td>
                        <td>{quantity}</td>
                        <td>₴ {productPrice.toLocaleString()}</td>
                        <td>₴ {(productPrice * quantity).toLocaleString()}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>Shipping Method</td>
            <td>{shippingMethod}</td>
          </tr>
          <tr>
            <td>Shipping Address</td>
            <td>{shippingAddress}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{shippingPhone}</td>
          </tr>
          <tr>
            <td>Shipping Price</td>
            <td>₴ {shippingPrice.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>₴ {totalSumma.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      {status === "new" && <button onClick={handlePayment}>Pay</button>}
    </div>
  );
};

export default OrderDetail;
