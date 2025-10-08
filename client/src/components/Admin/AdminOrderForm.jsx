import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import CONSTANTS from "../../constants";
import { updateOrderStatusThunk } from "../../store/ordersSlice";

const AdminOrderForm = ({ order }) => {
  const dispatch = useDispatch();
  const showStatus = (status) => (
    <option key={status} value={status}>
      {status}
    </option>
  );
  const onSubmit = (value) => {
    dispatch(updateOrderStatusThunk({ id: order._id, status: value.status }));
  };
  return (
    <Formik initialValues={{ status: order?.status }} onSubmit={onSubmit}>
      <Form>
        <Field as="select" name="status">
          {CONSTANTS.ORDER_STATUS.map(showStatus)}
        </Field>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};
export default AdminOrderForm;
