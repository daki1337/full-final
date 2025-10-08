import { mdiPurseOutline, mdiSale } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CONSTANTS from "../../constants";
import { addToCart } from "../../store/cartSlice";
import styles from "./ProductsList.module.scss";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const { title, price, stockQty, isSale, images, category } = product;
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <article className={styles.product}>
      {isSale && <Icon path={mdiSale} size={2} className={styles.sale} />}
      <div className={styles.pic}>
        <img
          src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`}
          alt={title}
        />
      </div>
      <h3>
        <Link to={`/products/${product?._id}`}>{title}</Link>
      </h3>
      <p>{price.toLocaleString()}₴</p>
      <p className={styles.category}>{category?.name}</p>
      <p>{stockQty > 0 ? "Available" : "Not Available"}</p>
      <Icon
        className={styles.cart}
        path={mdiPurseOutline}
        size={1}
        onClick={handleAddToCart}
      />
    </article>
  );
};

export default ProductItem;
