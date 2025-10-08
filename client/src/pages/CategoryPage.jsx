import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductsList from "../components/ProductsList/ProductsList";
import { getOneCategoryThunk } from "../store/categoriesSlice";
import styles from "./Pages.module.scss";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { selectedCategory, error, isLoading } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getOneCategoryThunk(categoryId));
  }, [dispatch, categoryId]);
  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.wrapper}>
      <p>{selectedCategory?.name}</p>
      {selectedCategory?.products?.length > 0 ? (
        <ProductsList products={selectedCategory?.products} />
      ) : (
        <p>Empty</p>
      )}
    </div>
  );
};
export default CategoryPage;
