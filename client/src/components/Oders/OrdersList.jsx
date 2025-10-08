import OrderRow from "./OrderRow";

const OrdersList = ({ orders, setOrderId }) => {
  const showOrderRow = (order) => <OrderRow key={order._id} order={order} setOrderId={setOrderId} />;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>order</th>
            <th>data</th>
            <th>total</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{orders.map(showOrderRow)}</tbody>
      </table>
    </div>
  );
};
export default OrdersList;
