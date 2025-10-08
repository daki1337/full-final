import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CONSTANTS from "../../constants";
import { addToCart } from "../../store/cartSlice";
import styles from "./Product.module.scss";

const Product = ({ product }) => {
  const { title, price, images, description, stockQty, category } = product;
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState(
    `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <article className={styles.product}>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <img src={mainImage} alt={title} />
        </div>
        <div className={styles.thumbnails}>
          {images.map((img, i) => {
            const url = `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`;
            return (
              <img
                key={i}
                src={url}
                onClick={() => setMainImage(url)}
                className={mainImage === url ? styles.activeThumb : ""}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.info}>
        <h2>{title}</h2>
        <p className={styles.price}>{price.toLocaleString()} ₴</p>
        <p>
          <Link to={`/categories/${category?.id}`}>{category?.name}</Link>
        </p>
        <p>{description}</p>
        <p>stockQty: {stockQty}</p>
        <button onClick={handleAddToCart}>Add to catd</button>
      </div>
    </article>
  );
};

export default Product;
