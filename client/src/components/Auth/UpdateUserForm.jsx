import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../store/authSlice";
import { updateValidateSchema } from "../../validation/user.validate";
import styles from "./authForm.module.scss";

const UpdateUserForm = ({ setIsUpdate }) => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    dispatch(updateUserThunk({ id: user?._id, values }));
    setIsUpdate(false);
  };

  return (
    <Formik
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={updateValidateSchema}
    >
      {() => {
        return (
          <Form className={styles.form}>
            {error && error.includes("409") && <p>Email already exists</p>}
            <h2>Sign up</h2>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" />
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" />
            <button type="submit" className={styles["btn-submit"]}>
              Register
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default UpdateUserForm;
