const OrderRow = ({ order, setOrderId }) => {
  const { _id, createdAt, totalSumma, status } = order;

  const formattedDateTime = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const handleViewDetail = () => {
    setOrderId(_id);
  };
  return (
    <tr>
      <td>{_id}</td>
      <td>{formattedDateTime}</td>
      <td>{totalSumma.toLocaleString()}₴</td>
      <td>{status}</td>
      <td>
        <button onClick={handleViewDetail}>view detail</button>
      </td>
    </tr>
  );
};
export default OrderRow;
