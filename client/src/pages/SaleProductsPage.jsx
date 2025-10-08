import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";
import ProductsList from "../components/ProductsList/ProductsList";
import { getSaleProductsThunk } from "../store/productsSlice";
import styles from "./Pages.module.scss";
const SaleProductsPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(10);

  const { products, totalProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSaleProductsThunk({ amount, page }));
  }, [dispatch, amount, page]);

  console.log(products);

  return (
    <div className={styles.wrapper}>
      <h3>Products on sale</h3>
      <ProductsList products={products} />
      <Pagination
        page={page}
        setPage={setPage}
        amount={amount}
        setAmount={setAmount}
        totalItems={totalProducts}
      />
    </div>
  );
};
export default SaleProductsPage;
