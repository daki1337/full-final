import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product/Product";
import { getProductByIdThunk } from "../store/productsSlice";
import styles from "./Pages.module.scss";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { selectedProduct } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProductByIdThunk(productId));
  }, [dispatch, productId]);
  console.log(productId);
  console.log(selectedProduct);
  return (
    <div className={styles.wrapper}>
      {selectedProduct ? (
        <Product product={selectedProduct} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default ProductPage;
